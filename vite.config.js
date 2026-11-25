import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function fileOpenBuild() {
  return {
    name: 'file-open-build',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        const bundle = context.bundle;
        if (!bundle) return html;

        for (const [name, output] of Object.entries(bundle)) {
          if (output.type === 'chunk' && name.endsWith('.js')) {
            const scriptTag = new RegExp(`<script[^>]+src="\\./${name}"[^>]*><\\/script>`);
            if (!scriptTag.test(html)) continue;
            html = html.replace(scriptTag, '');
            html = html.replace('</body>', () => `<script>${output.code.replaceAll('</script', '<\\/script')}</script></body>`);
            delete bundle[name];
          } else if (output.type === 'asset' && name.endsWith('.css')) {
            const styleTag = new RegExp(`<link[^>]+href="\\./${name}"[^>]*>`);
            if (!styleTag.test(html)) continue;
            html = html.replace(styleTag, () => `<style>${String(output.source).replaceAll('</style', '<\\/style')}</style>`);
            delete bundle[name];
          }
        }
        return html;
      },
    },
  };
}

export default defineConfig({ base: './', plugins: [react(), fileOpenBuild()] });
