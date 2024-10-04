# opigno_scorm (fork)

This repository contains a customized fork of the `opigno_scorm` module for rendering SCORM packages on a Drupal site.
For more information about the original project, visit the project page at https://www.drupal.org/project/opigno_scorm

## Table of Contents

- [Patches / Changes](#patches)
- [Usage](#usage)
- [License](#license)

## Patches
    - Fix missing json-schema dependency. (Authored by Liam McDermott)
    - Add header: true to library definition. (Authored by catch)

## Usage
Note: This a replacement of the original module. Do not use both in the same site. 

1. **Download the Module:**
    - Clone the repository or download the ZIP file from the repository page.
    - Extract the contents if you downloaded the ZIP file.

    ```bash
    git clone https://github.com/GlitchedCloud/opigno_scorm.git
    ```

2. **Place the Module:**
    - Move the extracted folder to your Drupal site's modules directory, typically located at `modules/custom`.

    ```bash
    mv opigno_scorm /path/to/your/drupal/site/modules/custom/
    ```

3. **Enable the Module:**
    - Navigate to the Extend page in your Drupal admin interface (`/admin/modules`).
    - Find and enable the `opigno_scorm` module.
    - Alternatively, you can enable the module using Drush:

    ```bash
    drush en opigno_scorm -y
    ```

4. **Clear Cache:**
    - Clear the cache.

    ```bash
    drush cr
    ```

5. **Profit.**

You have now successfully installed the `opigno_scorm` module on your Drupal site.

## License

This project is licensed under GNU General Public License, version 2. See the [LICENSE](LICENSE.md) file for details.