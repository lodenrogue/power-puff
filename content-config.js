// Input Watcher
const inputWatcher = new InputWatcher();

// Link Hinter
const linkKeySameTab = "f";
const linkKeyNewTab = "F";

const linkHinter = new LinkHinter(linkKeySameTab, linkKeyNewTab);
registry.register("normal", [linkKeySameTab], () => linkHinter.toggleHint(false));
registry.register("normal", [linkKeyNewTab], () => linkHinter.toggleHint(true));

registry.register("links", [linkKeySameTab], () => linkHinter.toggleHint(false));
registry.register("links", [linkKeyNewTab], () => linkHinter.toggleHint(true));

// Reloader
const reload = new Reload();
registry.register("normal", ["r"], () => reload.reload());

// Scroll
const scroller = new Scroll();
registry.register("normal", ["g", "g"], () => scroller.scrollToTop());
registry.register("normal", ["G"], () => scroller.scrollToBottom());
registry.register("normal", ["d"], () => scroller.scrollDown());
registry.register("normal", ["u"], () => scroller.scrollUp());

// Tab
const tab = new Tab();
registry.register("normal", ["x"], () => tab.close());
registry.register("normal", ["g", "t"], () => tab.switchToNext());
registry.register("normal", ["g", "T"], () => tab.switchToPrev());
