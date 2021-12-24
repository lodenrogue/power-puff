// Input Watcher
const inputWatcher = new InputWatcher();

// Link Hinter
const linkHinterKey = "f";
const linkHinter = new LinkHinter(linkHinterKey);
registry.register("normal", [linkHinterKey], () => linkHinter.toggleHint());

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
