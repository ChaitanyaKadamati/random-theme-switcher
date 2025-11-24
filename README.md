# 🎨 Random Theme Switcher

> Automatically switch VS Code themes at configurable intervals to keep your coding environment fresh and dynamic!

**Never get bored with the same theme again!** This extension randomly rotates through your favorite VS Code themes, bringing variety and visual refreshment to your development workflow.

## ✨ Features

- 🎨 **Automatic Theme Switching**: Rotate themes randomly at your preferred intervals (default: 30 minutes)
- 🎯 **Smart Theme Selection**: Choose exactly which themes to include in the rotation
- ⚙️ **Flexible Configuration**: Customize timing from 1 minute to hours through VS Code settings
- 🔄 **Manual Control**: Switch themes instantly or pause/resume automatic switching
- 🔍 **Theme Auto-Discovery**: Automatically finds all installed themes (built-in + extension themes)
- 🚫 **Smart Filtering**: Avoids switching to the currently active theme
- 💾 **Global Settings**: Configuration persists across all VS Code instances

## 📸 Screenshots

<!-- Add screenshots here when publishing -->
*Screenshots showing the extension in action with different themes will be added*

## Commands

Access these commands through the Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux):

- `Random Theme Switcher: Enable` - Start automatic theme switching
- `Random Theme Switcher: Disable` - Stop automatic theme switching
- `Random Theme Switcher: Switch Theme Now` - Immediately switch to a random theme
- `Random Theme Switcher: Refresh Available Themes` - Update the list of available themes

## Settings

Configure the extension through VS Code Settings (`Cmd+,` on macOS, `Ctrl+,` on Windows/Linux):

- `randomThemeSwitcher.enabled` (boolean, default: false): Enable or disable automatic theme switching
- `randomThemeSwitcher.intervalMinutes` (number, default: 30): Interval in minutes between theme switches (minimum: 1)
- `randomThemeSwitcher.themeList` (array): List of theme names to randomly switch between

## Installation

### From VSIX file (Current method)

1. Download the `random-theme-switcher-1.0.0.vsix` file
2. In VS Code, open the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`)
3. Run the command: `Extensions: Install from VSIX...`
4. Select the downloaded `.vsix` file
5. Reload VS Code when prompted

### Alternative installation methods

If the VSIX method doesn't work, you can also:

1. **Using terminal**: `code --install-extension random-theme-switcher-1.0.0.vsix`
2. **Using Extensions view**: 
   - Open the Extensions view (`Cmd+Shift+X` or `Ctrl+Shift+X`)
   - Click the "..." menu in the Extensions view header
   - Select "Install from VSIX..."
   - Choose the `.vsix` file

## Usage

1. **Initial Setup**:
   - Install the extension
   - The extension will automatically discover all available themes on first activation
   - Use the command `Random Theme Switcher: Refresh Available Themes` if you install new theme extensions later

2. **Enable Automatic Switching**:
   - Run command: `Random Theme Switcher: Enable`
   - Or set `randomThemeSwitcher.enabled` to `true` in settings

3. **Configure Options**:
   - Adjust the interval: Change `randomThemeSwitcher.intervalMinutes` (default: 30 minutes)
   - Customize theme list: Edit `randomThemeSwitcher.themeList` to include only your preferred themes

4. **Manual Control**:
   - Use `Random Theme Switcher: Switch Theme Now` to immediately switch themes
   - Use `Random Theme Switcher: Disable` to stop automatic switching

## Default Themes Included

The extension starts with these popular built-in themes:
- Default Dark Modern
- Default Light Modern  
- Default Dark+
- Default Light+
- Monokai
- Solarized Dark
- Solarized Light

Additional themes from installed extensions will be automatically detected and added to the list.

## Configuration Examples

### Set 15-minute intervals with custom themes:
```json
{
  "randomThemeSwitcher.enabled": true,
  "randomThemeSwitcher.intervalMinutes": 15,
  "randomThemeSwitcher.themeList": [
    "Default Dark Modern",
    "Monokai",
    "Solarized Dark",
    "GitHub Dark"
  ]
}
```

### Enable only dark themes:
```json
{
  "randomThemeSwitcher.themeList": [
    "Default Dark Modern",
    "Default Dark+",
    "Monokai",
    "Solarized Dark"
  ]
}
```

## Troubleshooting

- **Theme not switching**: Make sure the theme name in your `themeList` exactly matches the theme's display name
- **Extension not working**: Try reloading VS Code after installation
- **Missing themes**: Run `Random Theme Switcher: Refresh Available Themes` to update the theme list
- **Settings not saving**: Make sure you're editing User Settings, not Workspace Settings (unless you want workspace-specific configuration)

## Development

To build and develop this extension:

```bash
npm install
npm run compile
npm run package
```

## License

MIT License - see LICENSE file for details.