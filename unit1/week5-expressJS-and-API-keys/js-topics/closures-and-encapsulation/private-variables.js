// private-variables.js - Data Privacy and Encapsulation with Closures

console.log("🔐 Private Variables and Data Encapsulation with Closures\n");

// 1. 🏗️ BASIC PRIVATE VARIABLES

console.log("1. 🏗️ Basic Private Variables Pattern");

function createPerson(name, age) {
  // Private variables - cannot be accessed from outside
  let _name = name;
  let _age = age;
  let _secrets = [];
  
  console.log(`  👤 Creating person: ${_name}, age ${_age}`);
  
  // Public interface (methods that have access to private variables)
  return {
    // Getter methods
    getName: function() {
      return _name;
    },
    
    getAge: function() {
      return _age;
    },
    
    // Setter methods with validation
    setName: function(newName) {
      if (typeof newName === 'string' && newName.length > 0) {
        _name = newName;
        console.log(`    ✅ Name updated to: ${_name}`);
      } else {
        console.log(`    ❌ Invalid name: ${newName}`);
      }
    },
    
    setAge: function(newAge) {
      if (Number.isInteger(newAge) && newAge >= 0 && newAge <= 150) {
        _age = newAge;
        console.log(`    ✅ Age updated to: ${_age}`);
      } else {
        console.log(`    ❌ Invalid age: ${newAge}`);
      }
    },
    
    // Methods that work with private data
    addSecret: function(secret) {
      _secrets.push(secret);
      console.log(`    🤫 Secret added (total secrets: ${_secrets.length})`);
    },
    
    getSecretCount: function() {
      return _secrets.length;
    },
    
    // Method that processes private data
    introduce: function() {
      return `Hi, I'm ${_name}, I'm ${_age} years old, and I have ${_secrets.length} secrets.`;
    }
  };
}

// Test private variables
const person1 = createPerson("Alice", 25);
const person2 = createPerson("Bob", 30);

console.log("🧪 Testing private variable access:");
console.log(`  ${person1.introduce()}`);

// These work (public interface)
person1.setName("Alice Smith");
person1.setAge(26);
person1.addSecret("Loves pizza");

// These don't work (private variables are not accessible)
console.log(`  Direct access to _name: ${person1._name}`); // undefined
console.log(`  Direct access to _age: ${person1._age}`);   // undefined

// Validation works
person1.setAge(-5);  // Should fail
person1.setName(""); // Should fail

console.log(`  Final state: ${person1.introduce()}`);

// 2. 🏦 ADVANCED EXAMPLE: SECURE BANK ACCOUNT

console.log("\n2. 🏦 Advanced Example - Secure Bank Account");

function createBankAccount(accountNumber, initialBalance = 0, accountType = 'checking') {
  // Private variables
  let _balance = initialBalance;
  let _accountNumber = accountNumber;
  let _accountType = accountType;
  let _transactionHistory = [];
  let _isLocked = false;
  let _pin = null;
  let _failedAttempts = 0;
  
  console.log(`  🏦 Account ${_accountNumber} created with $${_balance}`);
  
  // Private helper functions
  function _recordTransaction(type, amount, description = '') {
    const transaction = {
      timestamp: new Date().toISOString(),
      type,
      amount,
      balance: _balance,
      description
    };
    _transactionHistory.push(transaction);
    console.log(`    📝 Transaction recorded: ${type} $${amount}`);
  }
  
  function _validatePin(inputPin) {
    if (_pin === null) return true; // No PIN set yet
    
    if (inputPin !== _pin) {
      _failedAttempts++;
      console.log(`    ❌ Invalid PIN (attempt ${_failedAttempts}/3)`);
      
      if (_failedAttempts >= 3) {
        _isLocked = true;
        console.log(`    🔒 Account locked due to too many failed attempts`);
      }
      return false;
    }
    
    _failedAttempts = 0; // Reset on successful PIN
    return true;
  }
  
  function _checkAccess(pin) {
    if (_isLocked) {
      console.log(`    🔒 Account is locked`);
      return false;
    }
    return _validatePin(pin);
  }
  
  // Public interface
  return {
    // Account information (read-only)
    getAccountNumber: function() {
      return _accountNumber;
    },
    
    getAccountType: function() {
      return _accountType;
    },
    
    // Balance operations (require PIN if set)
    getBalance: function(pin) {
      if (!_checkAccess(pin)) return null;
      return _balance;
    },
    
    deposit: function(amount, pin) {
      if (!_checkAccess(pin)) return false;
      
      if (amount <= 0) {
        console.log(`    ❌ Invalid deposit amount: $${amount}`);
        return false;
      }
      
      _balance += amount;
      _recordTransaction('DEPOSIT', amount);
      console.log(`    💰 Deposited $${amount}. New balance: $${_balance}`);
      return _balance;
    },
    
    withdraw: function(amount, pin) {
      if (!_checkAccess(pin)) return false;
      
      if (amount <= 0) {
        console.log(`    ❌ Invalid withdrawal amount: $${amount}`);
        return false;
      }
      
      if (amount > _balance) {
        console.log(`    ❌ Insufficient funds. Balance: $${_balance}, Requested: $${amount}`);
        _recordTransaction('FAILED_WITHDRAWAL', amount, 'Insufficient funds');
        return false;
      }
      
      _balance -= amount;
      _recordTransaction('WITHDRAWAL', amount);
      console.log(`    💸 Withdrew $${amount}. New balance: $${_balance}`);
      return _balance;
    },
    
    transfer: function(toAccount, amount, pin) {
      if (!_checkAccess(pin)) return false;
      
      if (this.withdraw(amount, pin) !== false) {
        // In a real system, you'd transfer to the other account
        _recordTransaction('TRANSFER_OUT', amount, `To account: ${toAccount}`);
        console.log(`    🔄 Transferred $${amount} to account ${toAccount}`);
        return true;
      }
      return false;
    },
    
    // Security operations
    setPin: function(newPin, currentPin) {
      if (_pin !== null && !_validatePin(currentPin)) {
        return false;
      }
      
      if (typeof newPin !== 'string' || newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
        console.log(`    ❌ PIN must be exactly 4 digits`);
        return false;
      }
      
      _pin = newPin;
      console.log(`    🔐 PIN ${_pin === null ? 'set' : 'updated'} successfully`);
      return true;
    },
    
    unlock: function(pin) {
      if (_validatePin(pin)) {
        _isLocked = false;
        _failedAttempts = 0;
        console.log(`    🔓 Account unlocked`);
        return true;
      }
      return false;
    },
    
    // Transaction history
    getTransactionHistory: function(pin, limit = 10) {
      if (!_checkAccess(pin)) return null;
      
      return _transactionHistory
        .slice(-limit) // Get last N transactions
        .map(t => ({
          ...t,
          // Remove sensitive information
          balance: '***'  // Hide balance in history
        }));
    },
    
    // Account status
    isLocked: function() {
      return _isLocked;
    },
    
    hasPin: function() {
      return _pin !== null;
    }
  };
}

// Test secure bank account
console.log("🏦 Testing secure bank account:");
const account = createBankAccount("ACC-001", 1000);

// Basic operations without PIN
account.deposit(100);
account.withdraw(50);
console.log(`  Balance: $${account.getBalance()}`);

// Set PIN and test security
account.setPin("1234");
console.log(`  PIN set: ${account.hasPin()}`);

// Operations now require PIN
account.deposit(200, "1234");  // Success
account.withdraw(75, "1234");  // Success
account.withdraw(50, "9999");  // Wrong PIN
account.withdraw(25, "8888");  // Wrong PIN
account.withdraw(10, "7777");  // Wrong PIN - should lock account

console.log(`  Account locked: ${account.isLocked()}`);

// Try to unlock
account.unlock("1234");

// 3. 🎮 GAME STATE MANAGEMENT

console.log("\n3. 🎮 Game State Management with Private Variables");

function createGame(playerName) {
  // Private game state
  let _player = {
    name: playerName,
    level: 1,
    experience: 0,
    health: 100,
    maxHealth: 100,
    inventory: [],
    gold: 0
  };
  
  let _gameSettings = {
    difficulty: 'normal',
    soundEnabled: true,
    musicVolume: 50
  };
  
  let _gameStats = {
    startTime: new Date(),
    totalPlayTime: 0,
    enemiesDefeated: 0,
    itemsCollected: 0
  };
  
  console.log(`  🎮 Game started for player: ${_player.name}`);
  
  // Private helper functions
  function _calculateExpForNextLevel(level) {
    return level * 100;
  }
  
  function _checkLevelUp() {
    const expNeeded = _calculateExpForNextLevel(_player.level);
    if (_player.experience >= expNeeded) {
      _player.level++;
      _player.experience -= expNeeded;
      _player.maxHealth += 10;
      _player.health = _player.maxHealth; // Full heal on level up
      console.log(`    🎉 Level up! Now level ${_player.level}`);
      return true;
    }
    return false;
  }
  
  function _saveGameState() {
    // In a real game, this would save to storage
    console.log(`    💾 Game saved for ${_player.name}`);
  }
  
  // Public game interface
  return {
    // Player information (read-only access to copies)
    getPlayerInfo: function() {
      return {
        name: _player.name,
        level: _player.level,
        experience: _player.experience,
        expNeeded: _calculateExpForNextLevel(_player.level),
        health: _player.health,
        maxHealth: _player.maxHealth,
        gold: _player.gold,
        inventoryCount: _player.inventory.length
      };
    },
    
    // Game actions
    gainExperience: function(amount) {
      if (amount <= 0) return false;
      
      _player.experience += amount;
      console.log(`    ⭐ Gained ${amount} experience (total: ${_player.experience})`);
      
      _checkLevelUp();
      _saveGameState();
      return true;
    },
    
    takeDamage: function(damage) {
      if (damage <= 0) return false;
      
      _player.health = Math.max(0, _player.health - damage);
      console.log(`    💔 Took ${damage} damage (health: ${_player.health}/${_player.maxHealth})`);
      
      if (_player.health === 0) {
        console.log(`    💀 ${_player.name} has been defeated!`);
        return 'defeated';
      }
      
      _saveGameState();
      return 'alive';
    },
    
    heal: function(amount) {
      if (amount <= 0) return false;
      
      const oldHealth = _player.health;
      _player.health = Math.min(_player.maxHealth, _player.health + amount);
      const actualHealing = _player.health - oldHealth;
      
      if (actualHealing > 0) {
        console.log(`    ❤️ Healed ${actualHealing} health (health: ${_player.health}/${_player.maxHealth})`);
        _saveGameState();
        return true;
      }
      
      return false;
    },
    
    addItem: function(item) {
      _player.inventory.push(item);
      _gameStats.itemsCollected++;
      console.log(`    📦 Collected: ${item} (inventory: ${_player.inventory.length} items)`);
      _saveGameState();
    },
    
    addGold: function(amount) {
      if (amount <= 0) return false;
      
      _player.gold += amount;
      console.log(`    💰 Gained ${amount} gold (total: ${_player.gold})`);
      _saveGameState();
      return true;
    },
    
    // Game settings (controlled access)
    updateSettings: function(newSettings) {
      const allowedSettings = ['difficulty', 'soundEnabled', 'musicVolume'];
      
      Object.keys(newSettings).forEach(key => {
        if (allowedSettings.includes(key)) {
          _gameSettings[key] = newSettings[key];
          console.log(`    ⚙️ Updated ${key} to: ${newSettings[key]}`);
        }
      });
      
      _saveGameState();
    },
    
    getSettings: function() {
      return { ..._gameSettings }; // Return copy, not original
    },
    
    // Game statistics
    getStats: function() {
      const currentTime = new Date();
      const sessionTime = (currentTime - _gameStats.startTime) / 1000;
      
      return {
        ..._gameStats,
        currentSessionTime: Math.round(sessionTime),
        totalPlayTime: _gameStats.totalPlayTime + sessionTime
      };
    },
    
    // Save/Load simulation
    exportSave: function() {
      return {
        player: { ..._player, inventory: [..._player.inventory] },
        settings: { ..._gameSettings },
        stats: { ..._gameStats }
      };
    },
    
    // This would be dangerous in a real game - validation needed
    importSave: function(saveData) {
      if (saveData && saveData.player && saveData.player.name === _player.name) {
        console.log(`    📁 Loading saved game for ${_player.name}...`);
        // In a real implementation, you'd validate all the data
        return true;
      }
      console.log(`    ❌ Invalid save data`);
      return false;
    }
  };
}

// Test game state management
console.log("🎮 Testing game state management:");
const game = createGame("Hero123");

// Play the game
game.gainExperience(50);
game.addItem("Sword");
game.addItem("Shield"); 
game.addGold(100);
game.takeDamage(25);
game.heal(10);

// Check player progress
console.log("  👤 Player info:", game.getPlayerInfo());

// Gain enough experience to level up
game.gainExperience(100);

// Update settings
game.updateSettings({ 
  difficulty: 'hard', 
  musicVolume: 75,
  invalidSetting: 'hack' // This should be ignored
});

console.log("  ⚙️ Settings:", game.getSettings());
console.log("  📊 Stats:", game.getStats());

// Try to access private variables (should fail)
console.log("  🔍 Direct access to _player:", game._player); // undefined

console.log("\n🎓 Private variables examples complete!");
console.log("💡 Key takeaways:");
console.log("   - Closures provide true data privacy in JavaScript");
console.log("   - Private variables cannot be accessed or modified from outside");
console.log("   - Use getter/setter methods to control access to private data");
console.log("   - Private helper functions can work with private data");
console.log("   - This pattern was essential before ES6 classes with private fields");
console.log("   - Still useful for functional programming and module patterns");

// 📚 DESIGN PATTERNS WITH PRIVATE VARIABLES:

/*
COMMON PATTERNS USING PRIVATE VARIABLES:

1. SINGLETON PATTERN:
const Singleton = (function() {
  let instance = null;
  let _data = {};
  
  return {
    getInstance: function() {
      if (!instance) {
        instance = this;
      }
      return instance;
    },
    setData: function(data) { _data = data; },
    getData: function() { return _data; }
  };
})();

2. MODULE PATTERN:
const MyModule = (function() {
  let _privateVar = 0;
  
  function _privateFunction() {
    return _privateVar * 2;
  }
  
  return {
    publicMethod: function() {
      return _privateFunction();
    },
    increment: function() {
      _privateVar++;
    }
  };
})();

3. OBSERVER PATTERN:
function createObserver() {
  let _observers = [];
  
  return {
    subscribe: function(callback) {
      _observers.push(callback);
    },
    unsubscribe: function(callback) {
      _observers = _observers.filter(obs => obs !== callback);
    },
    notify: function(data) {
      _observers.forEach(callback => callback(data));
    }
  };
}

4. FACTORY PATTERN WITH PRIVATE STATE:
function createUser(name, email) {
  let _id = Math.random().toString(36);
  let _loginCount = 0;
  
  return {
    getName: () => name,
    getEmail: () => email,
    getId: () => _id,
    login: () => ++_loginCount,
    getLoginCount: () => _loginCount
  };
}

BENEFITS OF PRIVATE VARIABLES:
- Data integrity and security
- Controlled access to internal state
- Prevention of accidental modification
- Clear public API design
- Encapsulation of complex logic

MODERN ALTERNATIVES:
- ES6 classes with private fields (#privateField)
- WeakMap for private data storage
- Symbols for "pseudo-private" properties
- TypeScript private modifiers

WHEN TO USE CLOSURES FOR PRIVACY:
- When you need true privacy (not just convention)
- When working with functional programming patterns
- When creating modules or libraries
- When you need fine-grained control over data access
- When working in environments without modern JavaScript features
*/