/**
 * ZetaWala — Adsterra Ads Configuration
 *
 * Integrated script codes for all 5 requested Adsterra ad formats:
 * 1. Native Banner (2:1 widget layout)
 * 2. Banner 160x300 (Vertical skyscraper)
 * 3. Banner 468x60 (Desktop/tablet horizontal header banner)
 * 4. Banner 320x50 (Mobile horizontal leaderboard banner)
 * 5. Banner 300x250 (Medium rectangle, post-tool & in-content)
 */

export const ADSTERRA_CONFIG = {
  // Global toggle to turn ads on or off across the site
  enabled: true,

  // 1. Native Banner (2:1 widget layout)
  native2x1: {
    id: 'adsterra-native-2x1',
    label: 'Native Banner (2:1)',
    layout: '2:1',
    code: `
      <script async="async" data-cfasync="false" src="https://bauval.org/21/1ac9709910f587992d09131fbf599c37"></script>
      <div id="container-1ac9709910f587992d09131fbf599c37"></div>
    `.trim(),
    minHeight: 200,
  },

  // 2. Banner 160x300 (Skyscraper)
  banner160x300: {
    id: 'adsterra-banner-160x300',
    label: 'Banner 160x300',
    width: 160,
    height: 300,
    code: `
      <script type="text/javascript">
        atOptions = {
          'key' : '5620ad8d872fcffd3d9be6f568c16ea8',
          'format' : 'iframe',
          'height' : 300,
          'width' : 160,
          'params' : {}
        };
      </script>
      <script type="text/javascript" src="https://bauval.org/22/5620ad8d872fcffd3d9be6f568c16ea8"></script>
    `.trim(),
    minHeight: 300,
  },

  // 3. Banner 468x60 (Header / Mid-banner)
  banner468x60: {
    id: 'adsterra-banner-468x60',
    label: 'Banner 468x60',
    width: 468,
    height: 60,
    code: `
      <script type="text/javascript">
        atOptions = {
          'key' : 'e63a1935354899ef2fb14c5a1956bfdc',
          'format' : 'iframe',
          'height' : 60,
          'width' : 468,
          'params' : {}
        };
      </script>
      <script type="text/javascript" src="https://bauval.org/22/e63a1935354899ef2fb14c5a1956bfdc"></script>
    `.trim(),
    minHeight: 60,
  },

  // 4. Banner 320x50 (Mobile Leaderboard)
  banner320x50: {
    id: 'adsterra-banner-320x50',
    label: 'Banner 320x50',
    width: 320,
    height: 50,
    code: `
      <script type="text/javascript">
        atOptions = {
          'key' : 'edc44b372e074cd7521f08560fb299f3',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      </script>
      <script type="text/javascript" src="https://bauval.org/22/edc44b372e074cd7521f08560fb299f3"></script>
    `.trim(),
    minHeight: 50,
  },

  // 5. Banner 300x250 (Medium Rectangle)
  banner300x250: {
    id: 'adsterra-banner-300x250',
    label: 'Banner 300x250',
    width: 300,
    height: 250,
    code: `
      <script type="text/javascript">
        atOptions = {
          'key' : '765ca06489e9b5351e0d08a65a1e8122',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      </script>
      <script type="text/javascript" src="https://bauval.org/22/765ca06489e9b5351e0d08a65a1e8122"></script>
    `.trim(),
    minHeight: 250,
  },

  // 6. Social Bar (Floating Push / Dialogue / In-Page Notification Bar)
  socialBar: {
    id: 'adsterra-social-bar',
    label: 'Social Bar',
    enabled: true,
    src: 'https://bauval.org/14/86d1407b5d0ce88a0baf95ce2b6f5db5',
  },
};
