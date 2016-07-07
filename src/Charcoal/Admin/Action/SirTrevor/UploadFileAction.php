<?php

namespace Charcoal\Admin\Action\SirTrevor;

use \Exception;

// Dependencies from PSR-7 (HTTP Messaging)
use \Psr\Http\Message\RequestInterface;
use \Psr\Http\Message\ResponseInterface;
use \Psr\Http\Message\UploadedFileInterface;

use \Pimple\Container;

// Dependencies from 'charcoal-core'
use \Charcoal\Source\File\UploadHandlerTrait;
use \Charcoal\Source\File\FilesizeAwareTrait;

// Dependencies from 'charcoal-app'
use \Charcoal\App\Http\File\Exception\FileException;
use \Charcoal\App\Http\File\Exception\UploadedFileException;

// Dependency from 'charcoal-admin'
use \Charcoal\Admin\AdminAction;

/**
 * Handle file uploads for Sir Trevor
 */
class UploadFileAction extends AdminAction
{
    use UploadHandlerTrait;
    use FilesizeAwareTrait;

    /**
     * The data to return Sir Trevor Block.
     *
     * @var array
     */
    private $returnData = [];

    /**
     * Inject dependencies from a DI Container.
     *
     * @param  Container $container A dependencies container instance.
     * @return void
     */
    public function setDependencies(Container $container)
    {
        parent::setDependencies($container);

        $this->setUploadHandlerTraitDependencies($container);
    }

    /**
     * Run action
     *
     * @param  RequestInterface  $request  A PSR-7 compatible Request instance.
     * @param  ResponseInterface $response A PSR-7 compatible Response instance.
     * @throws UploadedFileException If no file was uploaded or the file has issues.
     * @return ResponseInterface
     */
    public function run(RequestInterface $request, ResponseInterface $response)
    {
        try {
            $files = $request->getUploadedFiles();
            $data  = $request->getParsedBody();

            if (empty($files['attachment'])) {
                // Expected an attachment from Sir Trevor
                throw new UploadedFileException(UPLOAD_ERR_NO_FILE);
            }

            $file = $files['attachment'];

            // Problem on some configurations
            if (!$file instanceof UploadedFileInterface) {
                $file = $file['file'];

                if (!$file instanceof UploadedFileInterface) {
                    // Expected a file with the attachment from Sir Trevor
                    throw new UploadedFileException(UPLOAD_ERR_NO_FILE);
                }
            }

            $status = $file->getError();

            if ($status !== UPLOAD_ERR_OK) {
                throw new UploadedFileException($status, $file->getClientFilename());
            }

            # $this->validateAcceptedMimetypes($file);
            $this->validateMaxFilesize($file);

            if ($this->uploadFile($file)) {
                $this->setSuccess(true);
            } else {
                throw new UploadedFileException(null, $file->getClientFilename());
            }
        } catch (Exception $e) {
            $this->addFeedback('error', $e->getMessage());
        }

        if (!$this->success()) {
            $response = $response->withStatus(400);
        }

        return $response;
    }

    /**
     * Retrieve the list of accepted MIME types.
     *
     * @return array
     */
    public function acceptedMimetypes()
    {
        return [
            'image/gif',
            'image/jpg',
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/svg+xml'
        ];
    }

    /**
     * Validate if the uploaded file is of an accepted MIME type.
     *
     * @param  UploadedFileInterface $file The uploaded file.
     * @throws FileException If the file is of an invalid MIME type.
     * @return boolean
     */
    public function validateAcceptedMimetypes(UploadedFileInterface $file)
    {
        $acceptedTypes = $this->acceptedMimetypes();

        if (empty($acceptedTypes)) {
            // No validation rules = always true
            return true;
        }

        $type = $file->getClientMediaType();

        if (!$type) {
            $type = 'application/octet-stream';
        }

        $valid = in_array($type, $acceptedTypes);

        if (!$valid) {
            throw new FileException(
                sprintf(
                    'Invalid MIME type for "%s". Must be one of: %s',
                    $file->getClientFilename(),
                    implode(', ', $acceptedTypes)
                )
            );
        }

        return $valid;
    }


    /**
     * Validate if the uploaded file is within accepted sizes.
     *
     * @param  UploadedFileInterface $file The uploaded file.
     * @throws UploadedFileException If the file exceeds the maximum allowed size.
     * @return boolean
     */
    public function validateMaxFilesize(UploadedFileInterface $file)
    {
        $max = $this->maxFilesize();

        /** No max size rule = always true */
        if ($max == 0) {
            return true;
        }

        $size  = $file->getSize();
        $valid = ($size <= $max);

        if (!$valid) {
            throw new UploadedFileException(UPLOAD_ERR_FORM_SIZE, $file->getClientFilename());
        }

        return $valid;
    }

    /**
     * Upload the given file.
     *
     * @param  UploadedFileInterface $file The uploaded file.
     * @return boolean Whether the file was successfully uploaded (TRUE) or not (FALSE).
     */
    public function uploadFile(UploadedFileInterface $file)
    {
        $destPath = $this->basePath().$this->uploadPath();
        $filename = $file->getClientFilename();
        $target   = $destPath.$filename;

        if ($this->fileExists($target) && !$this->overwrite()) {
            $target = $destPath.$this->generateUniqueFilename($filename);
        }

        $file->moveTo($target);

        $pubPath = str_replace($this->basePath(), '', $target);
        $pubPath = '/'.ltrim($pubPath, '/');

        $this->setReturnData([
            'file' => [ 'url' => $pubPath ]
        ]);

        return true;
    }

    /**
     * Set the data to return to Sir Trevor Block.
     *
     * @param array $data An associative array of data for the Sir Trevor Block.
     * @return self
     */
    public function setReturnData(array $data)
    {
        $this->returnData = $data;

        return $this;
    }

    /**
     * Retrieve the data to return to Sir Trevor Block.
     *
     * @return array
     */
    public function returnData()
    {
        return $this->returnData;
    }

    /**
     * Returns an associative array of results.
     *
     * The raw array of results will be called from `__invoke()`.
     *
     * @return array
     */
    public function results()
    {
        if ($this->success()) {
            return $this->returnData();
        } else {
            return [
                'success'   => $this->success(),
                'feedbacks' => $this->feedbacks()
            ];
        }
    }
}
