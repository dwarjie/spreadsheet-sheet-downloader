# Spreadsheet Sheet Downloader

A browser extension that enables downloading individual sheets from Google Spreadsheets with enhanced functionality for combining multiple sheets into a single Excel file.

![Extension Demo](https://img.shields.io/badge/Status-Active-brightgreen)
![Chrome Support](https://img.shields.io/badge/Chrome-Supported-brightgreen)
![Firefox Support](https://img.shields.io/badge/Firefox-Supported-brightgreen)

## 🚀 Features

### Core Functionality
- **Single Sheet Download**: Download individual sheets from Google Spreadsheets
- **Multi-Sheet Download**: Combine multiple sheets into a single Excel file
- **Smart Sheet Detection**: Automatically detects available sheets in the spreadsheet
- **Sheet Selection**: Interactive modal for selecting which sheets to download

### User Experience
- **Seamless Integration**: Appears as a download button next to Google Sheets' version history
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Loading Overlays**: Prevents user interaction during processing
- **Warning Notifications**: Informs users about potential compatibility issues

### Technical Features
- **Client-Side Processing**: No server required, all processing happens in the browser
- **Cross-Browser Support**: Works on Chrome and Firefox
- **Manifest V3**: Built with the latest browser extension standards
- **Modular Architecture**: Clean, maintainable codebase

## 📦 Installation

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

#### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/spreadsheet-sheet-downloader.git
cd spreadsheet-sheet-downloader

# Install dependencies
npm install

# Build the extension
npm run build

# For development with hot reload
npm run dev
```

## 🛠️ Development

### Project Structure
```
spreadsheet-sheet-downloader/
├── src/
│   ├── main.js                 # Content script entry point
│   ├── modal.js                # Download type selection modal
│   ├── multiSelectModal.js     # Multi-sheet selection modal
│   ├── utils/
│   │   ├── sheetUtils.js       # Core sheet operations
│   │   ├── clickUtils.js       # Tab click simulation
│   │   ├── sheetCombiner.js    # Multi-sheet combining logic
│   │   └── loadingUtils.js     # Loading overlay management
│   └── index.css               # Styles and animations
├── public/
│   ├── manifest.json           # Extension manifest
│   └── file-arrow-down-solid.svg
├── package.json
└── vite.config.js
```

### Key Technologies
- **Vite**: Build tool and development server
- **@crxjs/vite-plugin**: Chrome extension development plugin for Vite
- **SheetJS (xlsx)**: Excel file processing and generation
- **FileSaver**: Cross-browser file download functionality
- **Manifest V3**: Modern browser extension API

## 🎯 Usage

### Single Sheet Download
1. Open a Google Spreadsheet with multiple sheets
2. Navigate to the sheet you want to download
3. Click the green download button (appears next to version history)
4. Select "Single Sheet Download" in the modal
5. Click "Confirm" to download the current sheet

### Multi-Sheet Download
1. Open a Google Spreadsheet with multiple sheets
2. Click the green download button
3. Select "Multi-Sheet Download" in the modal
4. Choose which sheets to include in the combined file
5. Click "Download" to generate and download the combined Excel file

## ⚠️ Known Limitations

### Browser Compatibility
- **Chrome**: Full functionality with optimal performance
- **Firefox**: Basic functionality works, but multi-sheet downloads may have issues

### Formatting Limitations
- **Multi-sheet Downloads**: May lose some formatting when combining sheets
- **Complex Formatting**: Advanced Google Sheets formatting might not be preserved
- **Charts and Images**: Not supported in combined downloads

## 🔧 Troubleshooting

### Common Issues

#### Extension Not Appearing
- Ensure you're on a Google Spreadsheet page (`docs.google.com/spreadsheets/`)
- Check that the spreadsheet has multiple sheets
- Verify the extension is properly loaded in browser extensions

#### Download Button Missing
- Refresh the page
- Check browser console for errors
- Ensure the extension has proper permissions

#### Multi-Sheet Download Issues
- Try using Chrome for best compatibility
- Check that all selected sheets are accessible
- Verify internet connection for downloading sheets

#### File Corruption
- Use Chrome for multi-sheet downloads
- Try downloading individual sheets instead
- Check browser console for error messages

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly in both Chrome and Firefox
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Areas for Improvement
- Better formatting preservation in multi-sheet downloads
- Support for more browsers
- Enhanced error handling
- Performance optimizations
- Additional export formats

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/spreadsheet-sheet-downloader/issues) page
2. Search existing issues before creating a new one
3. Provide detailed information about your environment and the issue
4. Include browser console logs if applicable
