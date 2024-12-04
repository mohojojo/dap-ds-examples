<script>
    import 'dap-design-system/dist/light.theme.css';
</script>

<slot />

<style>
  @font-face {
    font-family: Inter;
    font-style: normal;
    font-weight: 500 700;
    src:
        url('/node_modules/dap-design-system/dist/assets/fonts/InterVariable.woff2')
        format('truetype');
    font-display: swap;
    font-feature-settings:
        'liga' 1,
        'calt' 1,
        'ss02' 1;
    font-variation-settings: 'slnt' 0;
    font-optical-sizing: auto;
  }
</style>