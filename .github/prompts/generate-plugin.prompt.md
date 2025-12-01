---
description: Interactive WordPress single block plugin generator - guides you through creating a new plugin from the scaffold
---

# Generate New Single Block Plugin

I'll help you generate a new WordPress single block plugin from this scaffold. Let's gather the information needed to create your plugin.

## Information Gathering Process

I need to collect several pieces of information from you. I'll ask questions in stages to keep things organised.

---

## Stage 1: Plugin Identity (Required)

**Please answer these questions:**

1. **Plugin Name** (display name, e.g., "Testimonial Block")
   - What would you like to call your plugin?

2. **Plugin Slug** (URL-safe, lowercase, hyphens only, e.g., "testimonial-block")
   - This will be used for the block name, file names, and function prefixes

3. **Description** (one or two sentences)
   - What does this block do?

4. **Author/Organisation Name**
   - Who is creating this plugin?

5. **Author URI** (website URL)
   - Your website or organisation URL

---

## Stage 2: Block Configuration

Once you've answered Stage 1, I'll ask:

1. **Block Category** (default: "common")
   - Options: common, text, media, design, widgets, theme, embed
   - Where should the block appear in the inserter?

2. **Block Icon** (WordPress dashicon, e.g., "format-quote")
   - What icon represents your block?
   - See: https://developer.wordpress.org/resource/dashicons/

3. **Block Keywords** (comma-separated, for search)
   - What terms should help users find your block?

---

## Stage 3: Version & Compatibility

1. **Version** (e.g., "1.0.0")
   - Starting version number (default: 1.0.0)

2. **Minimum WordPress Version** (default: 6.0)
   - Lowest WP version supported

3. **Tested WordPress Version** (default: 6.7)
   - Highest WP version tested

4. **Minimum PHP Version** (default: 8.0)
   - Lowest PHP version required

---

## Stage 4: Block Features (Optional)

1. **Block Supports** - Which features should your block support?
   - [ ] Align (wide, full)
   - [ ] Anchor
   - [ ] Custom class name
   - [ ] Typography
   - [ ] Colour (text, background)
   - [ ] Spacing (margin, padding)

2. **Render Type**
   - Dynamic (PHP render callback) — recommended for most cases
   - Static (JavaScript save function) — for simple content blocks

---

## Generation Command

Once I have all the information, I'll generate the plugin using:

```bash
node bin/generate-single-block-plugin.js \
  --slug "{{slug}}" \
  --name "{{name}}" \
  --description "{{description}}" \
  --author "{{author}}" \
  --author_uri "{{author_uri}}" \
  --version "{{version}}"
```

---

## Post-Generation Steps

After generating, I'll help you:

1. **Review the generated files**
2. **Configure block.json** with your settings
3. **Set up initial block attributes**
4. **Install dependencies** (`npm install`)
5. **Start development** (`npm run start`)

---

## Let's Begin!

**Please provide your answers for Stage 1:**

1. Plugin Name:
2. Plugin Slug:
3. Description:
4. Author Name:
5. Author URI:

*Reply with your answers, and I'll confirm them before moving to Stage 2.*

---

## Example Session

**User**:
1. Hero Banner Block
2. hero-banner-block
3. A customisable hero banner with background image and call-to-action
4. LightSpeed
5. https://developer.lsdev.biz

**Assistant**: Great! I've captured:
- **Plugin Name**: Hero Banner Block
- **Plugin Slug**: hero-banner-block
- **Description**: A customisable hero banner with background image and call-to-action
- **Author**: LightSpeed
- **Author URI**: https://developer.lsdev.biz

Now let's configure the block.

**Stage 2: Block Configuration**
1. Block Category: (common, text, media, design, widgets, theme, embed)
2. Block Icon: (e.g., "cover-image", "format-image")
3. Block Keywords: (e.g., "hero, banner, header, cta")

*Provide your answers or type "defaults" for common/admin-generic.*

---

## Block Categories Reference

| Category | Description |
|----------|-------------|
| `text` | Text formatting blocks |
| `media` | Image, video, audio blocks |
| `design` | Layout and design blocks |
| `widgets` | Widget-type blocks |
| `theme` | Theme-specific blocks |
| `embed` | Embed content blocks |
| `common` | General purpose (default) |

---

## Related Resources

- [Generate Plugin Script](../../bin/generate-single-block-plugin.js)
- [Scaffold Generator Agent](../agents/scaffold-generator.agent.md)
- [Development Assistant](../agents/development-assistant.agent.md)
- [WP Block Build Agent](../agents/wp-block-build.agent.md)
