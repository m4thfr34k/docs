module.exports = {
  title: 'Adalo',
  tagline: 'CLI',
  url: 'https://AdaloHQ.github.io',
  baseUrl: '/cli/',
  favicon: 'img/favicon.ico',
  organizationName: 'AdaloHQ', // Usually your GitHub org/user name.
  projectName: 'cli', // Usually your repo name.
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Adalo Logo',
        src: 'img/adalo-logo-large.png',
      },
      links: [
        {
          href: 'https://github.com/AdaloHQ',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'create-new-adalo-component',
            },
            {
              label: 'Component Standards',
              to: 'component-standards',
            },
            {
              label: 'manifest.json',
              to: 'manifest',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href:
                'https://join.slack.com/t/adalo-community/shared_invite/enQtNTUyMTcwNzE4NDE3LWVkMWNjY2MxNzhlMjE0Nzc5OTA5Y2Y0YjgwMGEyYzZiZDcwNGFiYjNmMWJmNTBjNDA3NTBjOTdiZmQ4NDVmMGE',
            },
            {
              label: 'Forum',
              href: 'https://forum.adalo.com',
            },
            {
              label: 'Roadmap',
              href: 'https://ideas.adalo.com',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/AdaloHQ',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/AdaloHQ',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/AdaloHQ',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/AdaloHQ',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Adalo. Built with Docusaurus.`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/duotoneLight'),
      darkTheme: require('prism-react-renderer/themes/duotoneDark'),
      additionalLanguages: ['bash'],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
