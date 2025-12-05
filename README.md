# Auto Login JWT Generator - Chrome Extension

A Chrome extension for automatic login URL generation using JWT authentication.

## Features

- Generate JWT-authenticated login URLs
- Support for multiple environments (SIT, HLG, PRD)
- Configurable settings (secret key, birthdate, URLs)
- Simple and intuitive interface
- Secure storage using Chrome Storage API

## Installation

### Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `src` folder from this project
5. The extension icon should appear in your toolbar

## Usage

### Generating a Login URL

1. Click the extension icon in the Chrome toolbar
2. Enter the CPF (11 digits)
3. Select the environment (SIT, HLG, or PRD)
4. Click **Generate and Enter**
5. A new tab will open with the generated login URL

### Configuring Settings

1. Right-click the extension icon and select **Options**
   - Or click the settings link in the popup
2. Configure:
   - JWT Secret Key
   - Default Birthdate (DD/MM/YYYY format)
   - Environment URLs (SIT, HLG, PRD)
   - JWT Expiration time (in seconds)
3. Click **Save Configuration**

## Default Configuration

The extension comes with default settings that can be customized:

- **Secret Key**: Pre-configured (can be changed in settings)
- **Birthdate**: 10/10/2020
- **JWT Expiration**: 300 seconds (5 minutes)
- **Environments**: Pre-configured URLs (can be changed in settings)

## Technical Details

- **Manifest Version**: V3
- **JWT Algorithm**: HS256
- **JWT Library**: jsrsasign (v10.5.25)
- **Storage**: chrome.storage.sync
- **Minimum Chrome Version**: 88+

## Security Notes

- The secret key is stored using Chrome's encrypted storage
- JWT tokens expire after 5 minutes by default
- All inputs are validated before processing
- No data is sent to external servers

## Troubleshooting

### Extension won't load
- Verify you selected the `src` folder (not the project root)
- Check for errors in `chrome://extensions/` page
- Ensure all required files are present

### URL generation fails
- Verify configuration in Settings page
- Check browser console for error messages (F12)
- Ensure CPF is exactly 11 digits
- Verify birthdate format is DD/MM/YYYY

### Settings won't save
- Check Chrome storage permissions
- Clear extension data and reload
- Verify input formats are correct

## Development

### Project Structure

```
src/
├── manifest.json         # Extension manifest (V3)
├── popup/               # Main popup interface
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── options/             # Settings page
│   ├── options.html
│   ├── options.css
│   └── options.js
├── utils/               # Shared utilities
│   ├── storage.js       # Storage management
│   └── jwt-generator.js # JWT generation logic
├── lib/                 # External libraries
│   └── jsrsasign-all-min.js
└── icons/               # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Building from Source

No build step required. The extension runs directly from source files.

### Releases

This project uses GitHub Actions to automatically package the extension when a release is created.

**Download the latest version:**
- Go to [Releases](../../releases) page
- Download `auto-login-chrome-ext-v{version}.zip`
- Extract and load in Chrome

**For maintainers:**
- See [Release Guide](.github/RELEASE_GUIDE.md) for creating new releases
- The workflow automatically packages and uploads the extension ZIP

## Version History

### Version 1.3.0 (Latest)
- Modern UI with icon in header instead of emoji
- Improved semantic HTML structure (form, fieldset, header, footer)
- Smoother rounded corners throughout the interface
- Enhanced accessibility with ARIA labels and roles
- Better visual design with shadows and elevation effects

### Version 1.2.0
- Last used birthdate is automatically saved and restored
- Both CPF and birthdate are now remembered between uses
- Improved workflow efficiency

### Version 1.1.0
- Enhanced CPF validation with checksum algorithm
- Last used CPF is automatically saved and restored
- Birthdate field is now editable in popup
- Empty secret key by default (requires configuration)
- Better validation and error messages

### Version 1.0.0
- Initial release
- JWT authentication support
- Multi-environment support
- Configurable settings
- Chrome Storage API integration

## License

Internal use only.

## Support

For issues or questions, please refer to project documentation in `.ai-workspace/` directory.
