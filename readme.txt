=== 99Forms ===
Contributors: salimlabs
Tags: form, contact form, gutenberg, block, form builder
Requires at least: 6.8
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A native Gutenberg block-based contact form builder. Build contact forms directly inside the block editor — no shortcodes, no iframes.

== Description ==

99Forms is a lightweight, Gutenberg-native contact form builder built for WordPress 6.8+. Every form field is a proper block — drag, drop, and configure directly inside the editor. No shortcodes, no page builders required.

**Why 99Forms?**

Most form plugins were built before the block editor existed. They bolt on Gutenberg support as an afterthought — a single shortcode block wrapping a separate form builder UI. 99Forms is built block-first from day one.

**Available Field Blocks**

* Text, Email, Password, Number, Hidden input
* Textarea
* Checkbox
* Radio buttons
* Select dropdown
* Country picker (with phone code)
* File upload
* reCAPTCHA v2

**Form Features**

* Honeypot spam protection (built-in, no config needed)
* Google reCAPTCHA v2 support
* Configurable success and error messages
* Post-submission redirect URL
* Hide form after successful submission
* Server-side file upload validation (type + size)

**Admin Features**

* Submissions table with per-form filtering
* Bulk delete submissions
* Sortable columns (ID, date)

**Design & Styling**

* Label position: above or inline
* Global field width control
* Field spacing (margin) control
* Label width control (for inline mode)
* Padding control on the form wrapper

**Pro Version (Coming Soon)**

The free version covers all core form-building needs. A Pro version is planned with:

* Email notifications (admin + user confirmation)
* Conditional logic (show/hide fields based on values)
* Multi-step forms
* CSV export of submissions
* File attachment in notification emails
* Webhooks / Zapier integration

== Installation ==

1. Upload the `nnforms` folder to `/wp-content/plugins/`.
2. Activate the plugin from **Plugins → Installed Plugins**.
3. Open any page or post in the block editor.
4. Search for "Form" in the block inserter — add the **Form** block.
5. Add field blocks inside the Form block (Input, Textarea, Select, etc.).
6. Publish the page.

**reCAPTCHA Setup (optional)**

1. Go to **99Forms → Settings**.
2. Enter your Google reCAPTCHA v2 Site Key and Secret Key.
3. Add the **reCAPTCHA** block inside your form.

== Frequently Asked Questions ==

= Does this work with the classic editor? =

No. 99Forms is built exclusively for the Gutenberg block editor (WordPress 6.8+). It has no shortcode or classic editor support by design.

= Where are form submissions stored? =

Submissions are stored in a custom database table (`wp_nnforms_submissions`) created on plugin activation. View them under **99Forms → Submissions** in the admin.

= How do I filter submissions by form? =

On the **Submissions** page, use the "Choose a form" dropdown at the top and click Filter.

= Is the honeypot spam protection always active? =

Honeypot is enabled by default on each form. You can disable it per-form from the Form block settings in the editor sidebar.

= Can I have multiple forms on the same page? =

Yes. Each Form block gets a unique ID automatically.

= What file types are allowed for file upload fields? =

Currently: JPEG, PNG, and PDF. Maximum file size is 2MB per upload.

== Screenshots ==

1. The Form block with field blocks inside the block editor.
2. Label position and field width controls in the block sidebar.
3. Submissions table filtered by a specific form.
4. Plugin settings page (reCAPTCHA keys).

== Changelog ==

= 1.0.0 =
* Initial release.
* Form, Input, Textarea, Checkbox, Radio, Select, Country, File Upload, reCAPTCHA, and Submit blocks.
* Submissions stored in custom DB table with admin list table.
* Honeypot spam protection.
* reCAPTCHA v2 support.
* Per-form success/error messages and redirect URL.

== Upgrade Notice ==

= 1.0.0 =
Initial release. No upgrade steps required.