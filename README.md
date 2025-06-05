# Meal Plan Generator

A custom build tool that generates a static HTML meal plan from JSON data.

## Setup

1. Install dependencies:

```bash
npm install
```

## Usage

### Build static site

```bash
npm run build
```

This generates `dist/index.html` from your `meals.json` data.

### Development with live server

```bash
npm run dev
```

Builds the site and starts a local server at <http://localhost:3000>

### Watch mode

```bash
npm run watch
```

Automatically rebuilds when `meals.json` or `build.js` changes.

## Project Structure

- `meals.json` - Your meal data
- `build.js` - Custom build script
- `dist/index.html` - Generated static HTML
- `package.json` - Build scripts and dependencies

## Customization

Edit `build.js` to:

- Modify HTML templates
- Add new data processing
- Change styling
- Add build optimizations

```

## Usage Instructions

1. **Setup**: Run `npm install` to install dependencies
2. **Build**: Run `npm run build` to generate `dist/index.html`
3. **Development**: Run `npm run dev` to build and serve locally
4. **Watch mode**: Run `npm run watch` for automatic rebuilds

## Benefits of this Custom Build

- **Full control**: Modify any aspect of the generation process
- **No client-side JavaScript**: Pure static HTML
- **SEO optimized**: All content is pre-rendered
- **Fast loading**: No JSON parsing or DOM manipulation at runtime
- **Easy deployment**: Single HTML file can be deployed anywhere
- **Build automation**: Watch mode for development convenience
```
