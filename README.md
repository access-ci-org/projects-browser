# Projects Browser

This app provides a user interface to browse projects that are active with approved allocations.

## Example

```html
<div id="projects_browser_app"></div>
<script type="module">
  import { renderCatalog } from "https://esm.sh/@xras/projects-browser";

  renderCatalog({
    projects: "/path/to/projects.json",
    disable_bootstrap: false
  });
</script>
```

### Options
| Option  | Values | Required |
| ---     | ---    | ---      |
| `projects` | The URL for your project details | **True** |
| `disable_bootstrap` | If your site uses [Bootstrap](https://getbootstrap.com/) and you don't want this app to overwrite your styles, add this parameter.  | **False** |