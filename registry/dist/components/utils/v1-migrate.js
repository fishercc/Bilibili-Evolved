!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports["utils/v1-migrate"]=o():e["utils/v1-migrate"]=o()}(globalThis,(()=>(()=>{"use strict";var e,o,t={250:e=>{e.exports=coreApis.filePicker},765:e=>{e.exports=coreApis.utils.log}},n={};function a(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,a),i.exports}o=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(t,n){if(1&n&&(t=this(t)),8&n)return t;if("object"==typeof t&&t){if(4&n&&t.__esModule)return t;if(16&n&&"function"==typeof t.then)return t}var i=Object.create(null);a.r(i);var r={};e=e||[null,o({}),o([]),o(o)];for(var s=2&n&&t;"object"==typeof s&&!~e.indexOf(s);s=o(s))Object.getOwnPropertyNames(s).forEach((e=>r[e]=()=>t[e]));return r.default=()=>t,a.d(i,r),i},a.d=(e,o)=>{for(var t in o)a.o(o,t)&&!a.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},a.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};a.d(i,{component:()=>y});const r=coreApis.componentApis.define,s=coreApis.pluginApis.data,l=coreApis.componentApis.component,d=coreApis.componentApis.userComponent,c=coreApis.ajax,p=coreApis.cdnTypes,m=coreApis.meta,u=coreApis.settings,g=coreApis.toast;var f=a(765);const v=coreApis.pluginApis.hook,b=coreApis.pluginApis.plugin,y=(0,r.defineComponentMetadata)({name:"v1Migrate",displayName:"v1 设置迁移",description:{"zh-CN":"在设置的 `关于` 面板中添加 `导入 v1 设置` 按钮, 点击导入可以导入 v1 的设置, 并根据打开的选项自动下载安装 v2 中对应的功能."},tags:[componentsTags.utils],entry:()=>{(0,s.addData)("settingsPanel.about.actions",(e=>{e.push({icon:"mdi-inbox-arrow-down-outline",name:"importV1Settings",displayName:"导入 v1 设置",run:async()=>{const{logError:e}=await Promise.resolve().then(a.t.bind(a,765,23)),{pickFile:o}=await Promise.resolve().then(a.t.bind(a,250,23)),t=await o({accept:"*.json"});if(0===t.length)return;const[n]=t;try{const e=JSON.parse(await n.text());await(async e=>{const o=g.Toast.info("下载功能列表中","导入 v1 设置");try{console.log("下载功能列表中");const t=`${p.cdnRoots[(0,u.getGeneralSettings)().cdnRoot](m.meta.compilationInfo.branch)}doc/features/features.json`,n=await(0,c.monkey)({url:t});console.log(n);const a=JSON.parse(n);console.log("下载功能列表完成");const i=(o,t,n)=>async()=>{if(!e[o])return void console.log(`跳过了未开启的选项 ${o}`);const i={component:l.componentsMap,plugin:b.pluginsMap},r={component:d.installComponent,plugin:b.installPlugin};if(t in i[n])console.log(`${t} 已经存在, 跳过安装`);else{const e=a.find((e=>e.type===n&&e.name===t)),o=e?.fullAbsolutePath;if(!o||!e)return void console.log(`没有找到名为 ${t} 的功能`);const i=`${p.cdnRoots[(0,u.getGeneralSettings)().cdnRoot](m.meta.compilationInfo.branch,e.owner)}${o}`,s=await(0,c.monkey)({url:i}),{before:l,after:d}=(0,v.getHook)(`user${lodash.startCase(n)}s.add`,s,i);await l();const{metadata:g,message:f}=await r[n](s);await d(g),console.log(f)}},r=(o,t,n)=>()=>{const a=e[o],i=n?.(a)??a;if(void 0!==i){const[e,...o]=t.split("."),{options:n}=(0,u.getComponentSettings)(e);lodash.set(n,o,i)}console.log(`迁移了选项 ${o} -> ${t}`)},s=()=>()=>{const{customStyles:o}=e;o.filter((e=>e.enabled)).forEach((e=>{u.settings.userStyles[e.name]=lodash.omit(e,"enabled")}))},g=e=>i("guiSettings",e,"plugin"),f=()=>none,y={category:"home",activities:"feeds",bangumi:"subscriptions",watchlaterList:"watchlater",favoritesList:"favorites",historyList:"history",rankingLink:"ranking",drawingLink:"drawing",bangumiLink:"bangumi",musicLink:"music",matchLink:"match",shopLink:"shop"},h=[i("useDarkStyle","darkMode","component"),i("darkColorScheme","darkModeFollowSystem","component"),i("hideBanner","hideBanner","component"),i("expandDanmakuList","expandDanmakuList","component"),r("expandDanmakuListIgnoreMediaList","expandDanmakuList.ignoreMediaList"),i("expandDescription","fullVideoDescription","component"),i("watchlaterRedirect","watchlaterRedirect","component"),r("watchLaterRedirectNavbar","watchlaterRedirect.navbar"),r("watchLaterRedirectPage","watchlaterRedirect.page"),i("touchVideoPlayer","touchPlayerGestures","component"),i("touchVideoPlayer","touchPlayerControl","component"),i("customControlBackground","playerControlBackground","component"),r("customControlBackgroundOpacity","playerControlBackground.opacity",(e=>{const o=parseFloat(e);return Math.round(100*o)})),i("darkSchedule","darkModeSchedule","component"),r("darkScheduleStart","darkModeSchedule.range.start"),r("darkScheduleEnd","darkModeSchedule.range.end"),i("fullTweetsTitle","fullFeedsTitle","component"),i("fullPageTitle","fullEpisodeTitle","component"),i("removeVideoTopMask","hideVideoTopMask","component"),i("removeLiveWatermark","removeLiveWatermark","component"),i("harunaScale","dpiLiveShowgirl","component"),i("harunaScale","dpiLiveShowgirl","component"),i("removeAds","removePromotions","component"),r("showBlockedAdsTip","removePromotions.showPlaceholder"),r("preserveEventBanner","removePromotions.preserveEventBanner"),i("touchVideoPlayerDoubleTapControl","doubleClickControl","component"),r("customStyleColor","settingsPanel.themeColor"),i("useDefaultPlayerMode","defaultPlayerMode","component"),r("applyPlayerModeOnPlay","defaultPlayerMode.applyOnPlay"),r("defaultPlayerMode","defaultPlayerMode.mode"),i("skipChargeList","skipChargeList","component"),i("comboLike","touchComboLike","component"),i("autoLightOff","playerAutoLight","component"),i("airborne","danmakuAirborne","component"),i("useBiliplusRedirect","biliplusRedirect","component"),i("biliplusRedirect","biliplusRedirect","component"),i("framePlayback","seekByFrames","component"),i("useCommentStyle","simplifyComments","component"),i("imageResolution","imageResolution","component"),r("imageResolutionScale","imageResolution.scale"),i("playerFocus","playerFocus","component"),r("playerFocusOffset","playerFocus.offset"),i("simplifyLiveroom","simplifyLiveroom","component"),r("simplifyLiveroomSettings","simplifyLiveroom",(e=>{const{options:o}=(0,u.getComponentSettings)("simplifyLiveroom");Object.assign(o,Object.fromEntries(Object.entries(e).map((e=>{let[o,t]=e;return[`switch-${o}`,t]}))))})),i("customNavbar","customNavbar","component"),g("customNavbar.items.darkMode"),r("favoritesListCurrentSelect","customNavbar.lastFavoriteFolder"),r("touchNavBar","customNavbar.touch"),r("customNavbarFill","customNavbar.fill"),r("customNavbarTransparent","customNavbar.transparent"),r("customNavbarShadow","customNavbar.shadow"),r("customNavbarBlur","customNavbar.blur"),r("customNavbarOrder","customNavbar.order",(e=>(Object.keys(e).forEach((o=>{o in y&&(e[y[o]]=e[o],delete e[o])})),delete e.mangaLink,e))),r("customNavbarHidden","customNavbar.hidden",(e=>([...e].forEach((o=>{o in y&&(e.push(y[o]),lodash.pull(e,o))})),lodash.pull(e,"mangaLink"),e))),r("customNavbarBoundsPadding","customNavbar.padding",(e=>parseFloat(e))),r("customNavbarGlobalFixed","customNavbar.globalFixed"),r("customNavbarSeasonLogo","customNavbar.seasonLogo"),r("customNavbarShowDeadVideos","customNavbar.showDeadVideos"),i("playerShadow","playerShadow","component"),i("narrowDanmaku","preserveDanmakuInput","component"),i("outerWatchlater","outerWatchlater","component"),i("videoScreenshot","videoScreenshot","component"),i("hideBangumiReviews","hideBangumiReviews","component"),r("filenameFormat","settingsPanel.filenameFormat"),r("batchFilenameFormat","settingsPanel.batchFilenameFormat"),i("sidebarOffset","sidebarOffset","component"),r("sidebarOffset","sidebarOffset.offset"),i("noLiveAutoplay","liveHomeMute","component"),i("foldComment","rememberVideoSpeed","component"),r("defaultVideoSpeed","rememberVideoSpeed.speed"),r("rememberVideoSpeedList","rememberVideoSpeed.individualRememberList"),r("rememberVideoSpeed","rememberVideoSpeed.individualRemember"),r("extendVideoSpeed","rememberVideoSpeed.extend"),r("extendVideoSpeedList","rememberVideoSpeed.extendList"),i("foldComment","foldComments","component"),i("autoDraw","liveAutoDraw","component"),i("keymap","keymap","component"),r("keymapPreset","keymap.preset"),r("keymapJumpSeconds","keymap.longJumpSeconds"),r("customKeyBindings","keymap.customKeyBindings"),i("doubleClickFullscreen","doubleClickFullscreen","component"),r("doubleClickFullscreenPreventSingleClick","doubleClickFullscreen.preventSingleClick"),r("scriptLoadingMode","settingsPanel.scriptLoadingMode",(e=>e.replace(/\(自动\)$/,""))),r("guiSettingsDockSide","settingsPanel.dockSide"),i("fullActivityContent","fullFeedsContent","component"),i("feedsFilter","feedsFilter","component"),r("feedsFilterPatterns","feedsFilter.patterns"),r("feedsSpecialFilterTypes","feedsFilter.types"),r("feedsFilterSideCards","feedsFilter.sideCards"),i("selectableColumnText","columnUnlock","component"),i("miniPlayerTouchMove","touchMiniPlayer","component"),i("hideBangumiSponsors","hideBangumiSponsors","component"),i("hideRecommendLive","hideRecommendedLive","component"),i("hideRelatedVideos","hideRelatedVideos","component"),i("urlParamsClean","urlParamsClean","component"),i("collapseLiveSideBar","collapseLiveSideBar","component"),r("foregroundColorMode","settingsPanel.textColor"),r("updateCdn","settingsPanel.cdnRoot"),r("downloadPackageEmitMode","settingsPanel.downloadPackageEmitMode",(e=>"分别下载"===e?"单独下载":e)),i("bvidConvert","bvidConvert","component"),i("fixedSidebars","fixedFeedsSidebars","component"),i("autoHideSideBar","autoHideSidebar","component"),i("livePip","livePip","component"),i("extendFeedsLive","extendFeedsLive","component"),i("playerOnTop","playerOnTop","component"),i("quickFavorite","quickFavorite","component"),r("quickFavoriteID","quickFavorite.favoriteFolderID"),i("disableFeedsDetails","disableFeedsDetails","component"),i("elegantScrollbar","elegantScrollbar","component"),i("danmakuSendBar","liveDanmakuSendbar","component"),i("showCoverBeforePlay","showCoverBeforePlay","component"),i("seoJump","seoRedirect","component"),i("copyFeedsLink","copyFeedsLink","component"),i("copyCommentLink","copyCommentsLink","component"),i("unfoldFeeds","unfoldFeeds","component"),i("feedsImageExporter","imageExporter","component"),i("columnImageExporter","imageExporter","component"),i("preferAvUrl","avUrl","component"),i("homeHidden","simplifyHome","component"),r("homeHiddenItems","simplifyHome",(e=>{const{options:o}=(0,u.getComponentSettings)("simplifyHome");e.forEach((e=>o[`switch-${e}`]=!0))})),i("alwaysShowDuration","alwaysShowDuration","component"),i("removeVideoPopup","removePlayerPopup","component"),i("removeGuidePopup","removePlayerPopup","component"),i("removeVotePopup","removePlayerPopup","component"),r("removeVideoPopup","removePlayerPopup.relatedVideos"),r("removeGuidePopup","removePlayerPopup.comboLikes"),r("removeVotePopup","removePlayerPopup.votes"),i("checkInCenter","checkInCenter","component"),i("fullscreenGiftBox","liveGiftBox","component"),i("autoPlayControl","legacyAutoPlay","component"),i("scrollOutPlayer","playerIntersectionActions","component"),r("scrollOutPlayerTriggerPlace","playerIntersectionActions.triggerLocation"),r("scrollOutPlayerAutoPause","playerIntersectionActions.pause"),r("scrollOutPlayerAutoLightOn","playerIntersectionActions.light"),i("disableDanmakuHighlights","disableSpecialDanmaku","component"),i("disableUpDanmakuStyle","disableSpecialDanmaku","component"),r("disableDanmakuHighlights","disableSpecialDanmaku.highlight"),r("disableUpDanmakuStyle","disableSpecialDanmaku.up"),i("viewCover","viewCover","component"),i("downloadVideo","downloadVideo","component"),g("downloadVideo.outputs.aria2"),g("downloadVideo.outputs.idm"),r("downloadVideoQuality","downloadVideo.basicConfig.quality"),r("downloadVideoFormat","downloadVideo.basicConfig.api",(o=>({flv:"video.flv",dash:e.downloadVideoDashCodec.startsWith("HEVC")?"video.dash.hevc":"video.dash.avc"}[o]))),r("downloadVideoDefaultDanmaku","downloadVideo.danmakuType"),r("downloadVideoDefaultSubtitle","downloadVideo.subtitleType"),r("aria2RpcOptionProfiles","downloadVideo.rpcProfiles"),i("downloadDanmaku","downloadDanmaku","component"),i("downloadSubtitle","downloadSubtitle","component"),i("downloadAudio","downloadAudio","component"),i("downloadLiveRecords","downloadLiveRecords","component"),i("medalHelper","badgeHelper","component"),r("defaultMedalID","badgeHelper.defaultMedalID"),r("autoMatchMedal","badgeHelper.autoMatchMedal"),s(),f()];let k=0;o.message=`导入中... (${k}/${h.length})`;let S=0,P=0;for(const e of h)try{await e(),S++}catch(e){console.log(e),P++}finally{k++,o.message=`导入中... (${k}/${h.length})`}o.message=`导入完成. 成功 ${S} 个, 失败 ${P} 个, 可在控制台查看详细日志.`}catch(e){o.close(),(0,f.logError)(e)}})(e)}catch(o){e(o)}}})}))},commitHash:"6afdbff8a0511f11d5645e3091e3b9daf33fb488",coreVersion:"2.10.0"});return i=i.component})()));