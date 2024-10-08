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
    - Fix cmi.suspend_data not being correctly saved (Authored by ankur & Armon Castor)
    - Fix player's attach method being attached to multiple time / to multiple elements. (Authored by Armon Castor)

    - Modified so the client has the node ID and it can then be sent back to the server with the other SCORM commit data. (Authored by Armon Castor)
    - Modified so some information about the [SCORM] course and its completion status are stored in a storage entity. (Authored by Armon Castor)

## Usage
Note: This a replacement of the original module. Do not use both in the same site. 

1. **Add Custom Repository:**
    - Add the custom repository to your `composer.json` file.

    ```json
    {
        "repositories": [
            {
                "type": "vcs",
                "url": "https://github.com/glitchedcloud/opigno_scorm"
            }
        ]
    }
    ```

2. **Require the Module via Composer:**
    - Use Composer to require the module.

    ```bash
    composer require glitchedcloud/opigno_scorm 
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