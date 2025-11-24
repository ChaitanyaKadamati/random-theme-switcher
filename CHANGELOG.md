# Change Log

All notable changes to the "Random Theme Switcher" extension will be documented in this file.

## [1.0.0] - 2025-11-24

### Added
- 🎨 Initial release of Random Theme Switcher
- ⚙️ Configurable automatic theme switching with customizable intervals
- 🎯 Smart theme selection from user-defined theme lists
- 🔍 Automatic discovery of all installed themes (built-in and extensions)
- 🔄 Manual theme switching commands
- 💾 Persistent global configuration across VS Code instances
- 🚫 Smart filtering to avoid switching to the currently active theme

### Features
- **Commands**:
  - `Random Theme Switcher: Enable` - Start automatic theme switching
  - `Random Theme Switcher: Disable` - Stop automatic theme switching  
  - `Random Theme Switcher: Switch Theme Now` - Immediately switch to random theme
  - `Random Theme Switcher: Refresh Available Themes` - Update available themes list

- **Settings**:
  - `randomThemeSwitcher.enabled` - Enable/disable automatic switching
  - `randomThemeSwitcher.intervalMinutes` - Time interval between switches (min: 1 minute)
  - `randomThemeSwitcher.themeList` - Customizable list of themes to rotate through

- **Default Theme Support**:
  - Includes popular built-in VS Code themes
  - Automatically detects themes from installed extensions
  - Smart initialization with comprehensive theme discovery

### Technical
- Built with TypeScript for reliability and maintainability
- Efficient interval management with proper cleanup
- Error handling for missing or invalid themes
- Comprehensive logging for debugging

---

## Future Releases

### Planned Features
- 🌅 Time-based theme switching (light themes during day, dark at night)
- 🏷️ Theme tagging and categorization
- 📊 Usage statistics and favorite theme tracking
- 🎮 Workspace-specific theme preferences
- 🔔 Optional notifications when themes switch
- 📱 Integration with system dark/light mode preferences

### Feedback Welcome
Have ideas for new features? Found a bug? Please visit our [GitHub repository](https://github.com/your-username/random-theme-switcher) to:
- 🐛 Report issues
- 💡 Suggest features  
- 🤝 Contribute code
- ⭐ Star the project if you find it useful!