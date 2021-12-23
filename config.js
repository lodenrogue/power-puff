// Link Hinter
const linkHinterKey = "f";
const linkHinter = new LinkHinter(linkHinterKey);
registry.register([linkHinterKey], () => linkHinter.toggleHint());

// Reloader
const reload = new Reload();
registry.register(["r"], () => reload.reload());

// Scroll
const scroller = new Scroll();
registry.register(["g", "g"], () => scroller.scrollToTop());
registry.register(["G"], () => scroller.scrollToBottom());
registry.register(["d"], () => scroller.scrollDown());
registry.register(["u"], () => scroller.scrollUp());

// Tab
const tab = new Tab();
registry.register(["x"], () => tab.close());
