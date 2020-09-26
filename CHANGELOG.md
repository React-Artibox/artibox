# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.1](https://github.com/React-Artibox/artibox/compare/v1.2.0...v1.2.1) (2020-09-26)

### Bug Fixes

- **image:** use relative path to package itself ([9992941](https://github.com/React-Artibox/artibox/commit/9992941638bed39a5c8e9b6729fa6ddf61362009))

# [1.2.0](https://github.com/React-Artibox/artibox/compare/v1.1.0...v1.2.0) (2020-09-26)

### Features

- **image:** caption ([#60](https://github.com/React-Artibox/artibox/issues/60)) ([1bea030](https://github.com/React-Artibox/artibox/commit/1bea030135b59ef2aff56a1b5713b65089ee8edb))

### BREAKING CHANGES

- **image:** Image controller methods changed
  Jsx serializer become multiple as list's
  Old images won't break, but new images will be wrapped by a figure

# [1.1.0](https://github.com/React-Artibox/artibox/compare/v1.0.1...v1.1.0) (2020-09-14)

### Bug Fixes

- **file-uploader:** insert a paragraph block after file uploader block ([868c730](https://github.com/React-Artibox/artibox/commit/868c730b1339f4b1adac98508a6401b51778f9a7))
- **link:** set placement of tooltip to `bottom` ([52eca0b](https://github.com/React-Artibox/artibox/commit/52eca0b4af6725d07732d26149899b9728d9bef3))
- **toolbar:** set min-width to toolbar if inputting ([20ff558](https://github.com/React-Artibox/artibox/commit/20ff558942e59039e884b84f76a358781f1a0a41))
- **video:** let default video component resizable ([9e53b41](https://github.com/React-Artibox/artibox/commit/9e53b41d5933e10c539608f7869824e9ceb5e895))

### Code Refactoring

- rename `add` to `insert` of controllers of some packages ([da076fd](https://github.com/React-Artibox/artibox/commit/da076fd3fb8032e6d43fb893ca3a29ca82aae4a8))

### Features

- **blockquote:** support soft break ([fca2c04](https://github.com/React-Artibox/artibox/commit/fca2c045c2b87ca49a5e08e7757d256ccb35e645))
- **heading:** support soft break ([3b0f6fb](https://github.com/React-Artibox/artibox/commit/3b0f6fb61dec327faeb7b65a740f424a52bb32c9))
- **jsx-serializer:** support soft break ([adc303d](https://github.com/React-Artibox/artibox/commit/adc303d20967dda5242ec83cc2036ec4823a36f0))
- **soft-break:** initial commit ([61770cc](https://github.com/React-Artibox/artibox/commit/61770cc6c6991e4156f4302c7ba80cd7c39f9eb3))
- **toolbar:** support dynamic tools on toolbar ([302cb9b](https://github.com/React-Artibox/artibox/commit/302cb9baac66b6fc81ffd19a4ed2d8d21e79e9f0))

### BREAKING CHANGES

- use `insert` method instead of `add` method

## [1.0.1](https://github.com/React-Artibox/artibox/compare/v1.0.0...v1.0.1) (2020-05-13)

### Bug Fixes

- **theme:** add css, scss files to side effects ([02ef354](https://github.com/React-Artibox/artibox/commit/02ef354e4ee9aaa0c3bfb455522247baa07fc413))

# [1.0.0](https://github.com/React-Artibox/artibox/compare/v0.2.0...v1.0.0) (2020-05-12)

### Bug Fixes

- **toolbar:** add fixed box-sizing prevent for inherit issue ([#55](https://github.com/React-Artibox/artibox/issues/55)) ([1f44e79](https://github.com/React-Artibox/artibox/commit/1f44e79e0adfe7ce991135f4b1e9d4bfd579bfc9))

### Code Refactoring

- **theme:** rename palettes ([facbbba](https://github.com/React-Artibox/artibox/commit/facbbbafebc060455d2177797408137fb55a22c7))

### Features

- **theme:** support theme object ([1da9c38](https://github.com/React-Artibox/artibox/commit/1da9c3804da76bfb8ffa6c9a9d24549303e5c51b))

### BREAKING CHANGES

- **theme:** Theme file path changed, please see migrations.
- **theme:** css variables provided on editor changed

# [0.2.0](https://github.com/React-Artibox/artibox/compare/v0.1.2...v0.2.0) (2020-01-06)

### Features

- **file uploader:** initial commit ([#54](https://github.com/React-Artibox/artibox/issues/54)) ([3e2e17f](https://github.com/React-Artibox/artibox/commit/3e2e17f128bd4a6dc4294d4817b596a5da631259))
- **slate-image:** initial commit ([#52](https://github.com/React-Artibox/artibox/issues/52)) ([13ae387](https://github.com/React-Artibox/artibox/commit/13ae38752ac391bba41283f260c9f0229abb4f9a))

## [0.1.2](https://github.com/React-Artibox/artibox/compare/v0.1.1...v0.1.2) (2019-12-10)

**Note:** Version bump only for package artibox

## [0.1.1](https://github.com/React-Artibox/artibox/compare/v0.1.0...v0.1.1) (2019-12-09)

### Bug Fixes

- publish path ([#50](https://github.com/React-Artibox/artibox/issues/50)) ([e60b8fa](https://github.com/React-Artibox/artibox/commit/e60b8fa42e09fafbcb18f0763ae1fb7d39d65999))
- typings ([d85dffc](https://github.com/React-Artibox/artibox/commit/d85dffcd3a7c5952cce319d3f57c4936c1165f92))

# 0.1.0 (2019-12-09)

### Bug Fixes

- **components:** check if event.relatedTarget is Node ([5b78439](https://github.com/React-Artibox/artibox/commit/5b7843952c0e59da591d7d3786251853dadf786e))
- **components:** typo on Tooltip ([4c7c2f9](https://github.com/React-Artibox/artibox/commit/4c7c2f96d5e6e80b6cbed1e4f177f01e855891de))
- **slat-plugin-blockquote:** soft break hotkey ([e8dfb65](https://github.com/React-Artibox/artibox/commit/e8dfb651ed8ffbfb44f72635dcc1a1235a82783a))
- **slate-blockquote:** add suffix on controller methods ([d71aff1](https://github.com/React-Artibox/artibox/commit/d71aff100c2503c2a7d9af11f43fa5e52e0cc7c6))
- **slate-common:** add RenderCommonMark type ([1e7b8e8](https://github.com/React-Artibox/artibox/commit/1e7b8e88d06eb82db1e52e22d66b22f1aa5b339c))
- **slate-core:** hasQuery and hasQuery check is function or not ([96019a3](https://github.com/React-Artibox/artibox/commit/96019a3fd3a43aec46ea299043937de50a66d0c8))
- **slate-core:** render method in resolveModules ([2eb1175](https://github.com/React-Artibox/artibox/commit/2eb1175be93fa2c3e7b6e20e469f2ee2e72914b8))
- **slate-jsx-serializer:** render <>&[#65279](https://github.com/React-Artibox/artibox/issues/65279);</> instead of <br/> ([d25506a](https://github.com/React-Artibox/artibox/commit/d25506ac5b12e7fac7959328467a3e76e9818492))
- **slate-jsx-serializer:** serialize ValueJSON instead of Value ([30636d7](https://github.com/React-Artibox/artibox/commit/30636d72d0f5702d5be6b6b154aeff5ce13a3ad8))
- **slate-link:** add Partial on LinkForPluginConfig ([6de165c](https://github.com/React-Artibox/artibox/commit/6de165cb84e673aff4fb7315ebebe4c3c5e0c08e))
- **slate-plugin-bold:** export constants on entry ([ab667f4](https://github.com/React-Artibox/artibox/commit/ab667f4f34c744b70b2157befe90a590c5d0e7bd))
- **slate-plugin-bold:** move hotkey to constant ([dbcc1fc](https://github.com/React-Artibox/artibox/commit/dbcc1fc326246232be53d0e9474e9fc88547d421))
- **slate-plugin-heading:** two blocks added while enter pressed ([bf71314](https://github.com/React-Artibox/artibox/commit/bf71314d8960cabf87bf41d099c7a6911a77710c))
- **slate-plugin-hotkey:** typings of HotkeyPlugin ([df7d33b](https://github.com/React-Artibox/artibox/commit/df7d33bbc3cefac3746ad305668f0717cd6dc98e))
- **slate-plugin-input-block:** commandStart behavior ([2d57202](https://github.com/React-Artibox/artibox/commit/2d572029cb0ae1663087e847cc7be85f1aea148e))
- **slate-plugin-link:** focus editor after modal closed ([7e14d4d](https://github.com/React-Artibox/artibox/commit/7e14d4d978b7d2b312b66bc85cc6cebdfebb2b4f))
- **slate-plugin-link:** move `editor.focus()` to onClose ([00b394a](https://github.com/React-Artibox/artibox/commit/00b394a57190a43889a47f5c52824a65187a932c))
- **slate-plugin-list:** backspace handler ([9341d9f](https://github.com/React-Artibox/artibox/commit/9341d9fcff948c4c65f377f51ddeb807a3426829))
- **slate-plugin-list:** use getClosest to query instead of getParent ([57644cb](https://github.com/React-Artibox/artibox/commit/57644cb811d322ae2acfbdc175db9242f261f94c))
- **slate-plugin-video:** set isVoid true ([457c061](https://github.com/React-Artibox/artibox/commit/457c06178a22f0326d1316a91e21d6f8191d7893))
- **slate-separation-line:** add suffix on controller methods ([833968e](https://github.com/React-Artibox/artibox/commit/833968e08baaa214714d00315b917dd03713cc2b))
- **slate-toolbar:** condition of expanded and collapsed ([8a3a236](https://github.com/React-Artibox/artibox/commit/8a3a2367432b09d7e606c6648e98313fea8f81f9))
- **slate-toolbar:** focus issue ([32ce98b](https://github.com/React-Artibox/artibox/commit/32ce98b112e662136fe5aee4435693214c64734b))
- **slate-toolbar:** only render toolbar input while expanded ([01d2c06](https://github.com/React-Artibox/artibox/commit/01d2c064f6b4130769e525cd60cb9a08b48d0fc7))
- **slate-toolbar:** won't show toolbar if not focused ([c13f15a](https://github.com/React-Artibox/artibox/commit/c13f15af5dd788d798e9fd1714c34685d3f4cc76))
- **slate-utils:** generic type of getQuery and getCommand ([347f041](https://github.com/React-Artibox/artibox/commit/347f0414c95b8b5f7701ab4c70448b999659d998))
- **theme:** tooltip color ([a654edf](https://github.com/React-Artibox/artibox/commit/a654edf8bd4e0cd3ccde38d8b0ac041774e0df07))
- **theme:** transition of color of input block placeholder ([a699f92](https://github.com/React-Artibox/artibox/commit/a699f92cabb5e398f998dc88b3f0e194a99ee54b))
- rename onMouseDown to onClick of ToolHook ([9b90c06](https://github.com/React-Artibox/artibox/commit/9b90c06c1b2674dba4bf15c0179fecf93fe88522))
- should foward ref in RendererBaseComponent ([fceb630](https://github.com/React-Artibox/artibox/commit/fceb6301a90e44be9bf7e6d2298e3705d7fbbac7))
- type of editor from event handlers ([3a3bf48](https://github.com/React-Artibox/artibox/commit/3a3bf48dd053511a14d7b128f7ea42733befe3ef))

### Features

- **common:** rename from renderer package ([5048c88](https://github.com/React-Artibox/artibox/commit/5048c88b918cf8fd7fb4e61c2eb653bea43bd0f2))
- **components:** add Portal and Modal ([1753d13](https://github.com/React-Artibox/artibox/commit/1753d13fb896ae7289da3c69e6c655b81943fdd4))
- **components:** add Tooltip ([b5152b8](https://github.com/React-Artibox/artibox/commit/b5152b871ed4cf946ac7681130f7f35e1d417107))
- **icons:** add list icons ([21b1314](https://github.com/React-Artibox/artibox/commit/21b1314ae12c1bb8384b336ad16bdfecb5f6937a))
- **icons:** initial ([bd006e0](https://github.com/React-Artibox/artibox/commit/bd006e0b9758c0d0ea63a1ece72f8a4f3ccd07c3))
- **locale:** initial commit ([0f37b92](https://github.com/React-Artibox/artibox/commit/0f37b92dca38238b6812db0165b00feec4c38f8f))
- **slate-bold:** add hooks ([d39f759](https://github.com/React-Artibox/artibox/commit/d39f759a3dbe2a5fb8176c956eff5ab072eeea7d))
- **slate-common:** add CommonRendererConfig and NodeIsVoid ([eaab34c](https://github.com/React-Artibox/artibox/commit/eaab34c5ce369b75f8e3a72ce66577a333006e8d))
- **slate-common:** add HasNodeType ([86717e8](https://github.com/React-Artibox/artibox/commit/86717e8a1778c5f6c20692e7c6207a9d03bc963d))
- **slate-common:** add HotKeyPlugin ([aca42fa](https://github.com/React-Artibox/artibox/commit/aca42fa1e158578deddc83b208bb7e37b2c1fed0))
- **slate-common:** add toggle-mark and refactor file structure ([8353208](https://github.com/React-Artibox/artibox/commit/83532083ff3119c70f9ee1de085586c48d37421e))
- **slate-common:** extract types to single file and add mergePlugins ([0e67291](https://github.com/React-Artibox/artibox/commit/0e67291aead9ad59769f7db748e00c8a3c601027))
- **slate-core:** add hasQuery and hasCommand ([91f955b](https://github.com/React-Artibox/artibox/commit/91f955bd9f59f7b97546606f35349df6ac762f5e))
- **slate-core:** add type util ([9fb9b2d](https://github.com/React-Artibox/artibox/commit/9fb9b2d4301e6ace5174ba46e3c147a8671e38e3))
- **slate-editor:** placeholder ([f290e6f](https://github.com/React-Artibox/artibox/commit/f290e6fd5db175f177e5fc2e6989f6020ca87a20))
- **slate-jsx-serializer:** initial commit ([0288143](https://github.com/React-Artibox/artibox/commit/02881433d85038570277978c77546325e290c10b))
- **slate-link:** add tooltip to link component ([ebbf5f8](https://github.com/React-Artibox/artibox/commit/ebbf5f83807eeec53e7cd32e9a5178f4273ffdc6))
- **slate-module-bold:** move from slate-plugin-bold ([1c7b9f3](https://github.com/React-Artibox/artibox/commit/1c7b9f3533b69ce212bdcb827b9f1ddea31d5d99))
- **slate-module-toggle-mark:** move from slate-common ([8e6fa35](https://github.com/React-Artibox/artibox/commit/8e6fa351a55bae0f7adca86d61be7ccb3a426772))
- **slate-plugin-blockquote:** initial ([b74c25c](https://github.com/React-Artibox/artibox/commit/b74c25c15836b95ba74064e433ac5da79b3f1df5))
- **slate-plugin-bold:** initial ([dca3532](https://github.com/React-Artibox/artibox/commit/dca35327216d22affec7c9908944c90f98b1c436))
- **slate-plugin-bold:** use toggle mark plugin ([3317e3a](https://github.com/React-Artibox/artibox/commit/3317e3adf4c67f677c2ae6507f226f5bf6015567))
- **slate-plugin-facebook:** initial commit ([c774cd8](https://github.com/React-Artibox/artibox/commit/c774cd841ade19221d6c4d2df9952cafc6cbbc7f))
- **slate-plugin-heading:** add schema ([7d89811](https://github.com/React-Artibox/artibox/commit/7d89811ceffeb090fe9b87d5b928f1b907322f23))
- **slate-plugin-heading:** initial ([4c725f9](https://github.com/React-Artibox/artibox/commit/4c725f98cb3426f67e70acb1ac7bbd36f1cc9b14))
- **slate-plugin-highlight:** initial ([820bd13](https://github.com/React-Artibox/artibox/commit/820bd130aa20677a5f931af2a7e21b0a9d6bf7fa))
- **slate-plugin-hotkey:** initial commit ([3cc58a6](https://github.com/React-Artibox/artibox/commit/3cc58a68cf31454bc455f185dd0cf9ec48b1c3bc))
- **slate-plugin-input-block:** cmd+a handler ([4120d39](https://github.com/React-Artibox/artibox/commit/4120d393381ba584e0c79ed26622c65d566c394b))
- **slate-plugin-input-block:** initial ([5fc12ee](https://github.com/React-Artibox/artibox/commit/5fc12ee6e354f5a69008958ed0befff71caa7164))
- **slate-plugin-instagram:** initial commit ([f8ea8fa](https://github.com/React-Artibox/artibox/commit/f8ea8fa5c349aa77e0022ab890e4be5f66a6f9b6))
- **slate-plugin-italic:** initial config ([1b4d619](https://github.com/React-Artibox/artibox/commit/1b4d6194aa87781a8362e1bd652e213e1d3ab507))
- **slate-plugin-link:** initial ([c512747](https://github.com/React-Artibox/artibox/commit/c5127477b8df1594912ce413dd08e583f01937ab))
- **slate-plugin-link:** unlink ([5ecd58f](https://github.com/React-Artibox/artibox/commit/5ecd58fa3a519e594fd76033aba348cc3f4f0379))
- **slate-plugin-list:** add queries and commands ([50695a5](https://github.com/React-Artibox/artibox/commit/50695a5edb757039b1020a11a615bc0b1be2a76a))
- **slate-plugin-list:** add schema ([bec98ab](https://github.com/React-Artibox/artibox/commit/bec98ab8cd34faf1d5dd97a6c9d6a2f3fe290ff8))
- **slate-plugin-list:** initial ([b328f20](https://github.com/React-Artibox/artibox/commit/b328f202edffbea8b1098fe7e48b95cccc1e845d))
- **slate-plugin-separation-line:** initial ([a6d05a7](https://github.com/React-Artibox/artibox/commit/a6d05a70dff3a55d75cbb25add82aa6995e83a02))
- **slate-plugin-strikethrough:** initial ([23a1ebe](https://github.com/React-Artibox/artibox/commit/23a1ebeae450ffc1b1ac88b23c0a5c862d71aefa))
- **slate-plugin-underline:** initial ([8c91f1a](https://github.com/React-Artibox/artibox/commit/8c91f1a733989abc4cff4fbed72219b14e51e3f1))
- **slate-plugin-video:** initial commit ([c645d72](https://github.com/React-Artibox/artibox/commit/c645d72be82de752bc6e474acdc45d3b35a49daf))
- **slate-plugin-video:** support vimeo ([274aa16](https://github.com/React-Artibox/artibox/commit/274aa1624efb98c377137fcc6a47a912ab77cc02))
- **slate-react:** initial commit ([de8ec0f](https://github.com/React-Artibox/artibox/commit/de8ec0f6270b4414e809ac22922a0863a898f0d7))
- **slate-renderer:** add basic tag-mark renderer ([33471dd](https://github.com/React-Artibox/artibox/commit/33471ddf804af54ff0f87a2f895e5b6334e64831))
- **slate-renderer:** add common-inline renderer ([1945b18](https://github.com/React-Artibox/artibox/commit/1945b1805912933f5b81d06b32a61222a9adf74f))
- add getPlaceholder ([fdcbb8f](https://github.com/React-Artibox/artibox/commit/fdcbb8ffbf907040eca781d2dd98498ef4650c63))
- **slate-renderer:** add paragraph renderer ([be8b92e](https://github.com/React-Artibox/artibox/commit/be8b92e9667bcf89939943b267b4de62e795dd84))
- **slate-toolbar:** add disabledBlocks config ([8690444](https://github.com/React-Artibox/artibox/commit/869044466db8b6c0e1798941c81df9d57c47d097))
- **slate-toolbar:** add input block into toolbar ([69040db](https://github.com/React-Artibox/artibox/commit/69040db98ec4b962ac2b7c96319a3ca83671ebfa))
- **slate-toolbar:** add input cross ([7bf4f91](https://github.com/React-Artibox/artibox/commit/7bf4f91b5821646863e1ed355c9f7412f34042bd))
- **slate-toolbar:** add toolbar input ([5c9b6a2](https://github.com/React-Artibox/artibox/commit/5c9b6a218aff49d2e02a5b80171230c0359c9810))
- **slate-toolbar:** make toolbar as tooltip style ([51e22fd](https://github.com/React-Artibox/artibox/commit/51e22fd4f87c8ce28c41dee24f463b0c0286d262))
- **slate-types:** move types to here ([a562326](https://github.com/React-Artibox/artibox/commit/a562326834d519ef7e02aea554f1ac74a4bef249))
- **theme:** add artibox-dark ([fe90415](https://github.com/React-Artibox/artibox/commit/fe904151f47031c64041b1d5d691f682f31ff6fb))
- **theme:** add darker and lighter of primary ([efad7da](https://github.com/React-Artibox/artibox/commit/efad7da620f7b6532c1fec1151feac8b8c09fdb6))
- **theme:** add placeholder theme ([d0a816d](https://github.com/React-Artibox/artibox/commit/d0a816d4a3154124655dcd7d3faaeec16f640b4c))
- **theme:** add theme register ([387b216](https://github.com/React-Artibox/artibox/commit/387b216241e4675580f6fb66b95e499a6581c21a))
- **theme:** revise neutral color ([78bb5a8](https://github.com/React-Artibox/artibox/commit/78bb5a8e63c1835e96f102e700e13916ef88f7b5))
- add createJsxSerializerRule ([901d518](https://github.com/React-Artibox/artibox/commit/901d5186483bc7171ea7b425e6443710aa7fae3b))
- add forToolHook ([561be28](https://github.com/React-Artibox/artibox/commit/561be288085dd99b95d2e73c0e78641dc531465d))
- forPlugin ([dcc9db4](https://github.com/React-Artibox/artibox/commit/dcc9db47ef3d02d6c3a18a31b4a546b5b4a95b89))
- slate-toolbar and slate-editor ([61c4d19](https://github.com/React-Artibox/artibox/commit/61c4d1970328330662e9753f6b15dbb70137b42d))
