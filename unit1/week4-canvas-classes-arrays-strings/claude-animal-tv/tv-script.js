// Create multiple TVs
const tv1 = new TV('tv-1');
const tv2 = new TV('tv-2');
const tv3 = new TV('tv-3');

// Each TV maintains independent state
tv1.togglePower(); // Only TV1 turns on
tv1.changeChannel('cat'); // Only TV1 shows cats
tv2.togglePower(); // TV2 turns on separately
tv2.changeChannel('dog'); // TV2 shows dogs independently