# Charcoal Property Sir Trevor

Sir Trevor provides a means to transform a text input into a rich content editor that’s been re-imagined for the web. The content of the editor is stored inside a JSON object, with the structure and the contents of the post serialized inside of it.

## Usage

**Charcoal Input Property**

```json
{
    "properties": {
        "content_blocks": {
            "type": "structure",
            "input_type": "charcoal/admin/property/input/sir-trevor",
            "label": "Content Blocks"
        }
    }
}
```

**Charcoal Action Route**

```json
{
    "admin": {
        "routes": {
            "actions": {
                "property/sir-trevor/upload": {
                    "ident": "charcoal/admin/action/sir-trevor/upload-file",
                    "action_data": {
                        "upload_path": "uploads/content/blocks/",
                        "public_access": true
                    }
                }
            }
        }
    }
}
```
