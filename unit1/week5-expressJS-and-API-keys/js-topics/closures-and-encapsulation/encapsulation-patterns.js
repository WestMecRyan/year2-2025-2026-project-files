// encapsulation-patterns.js - Advanced Encapsulation Patterns and Module Design

console.log("🏗️ Advanced Encapsulation Patterns - Building Robust JavaScript Modules\n");

// 1. 📦 THE REVEALING MODULE PATTERN

console.log("1. 📦 Revealing Module Pattern");

const CalculatorModule = (function() {
  // Private variables and functions
  let _result = 0;
  let _history = [];
  let _precision = 2;
  
  function _round(number) {
    return Number(number.toFixed(_precision));
  }
  
  function _recordOperation(operation, operand, result) {
    _history.push({
      timestamp: new Date().toISOString(),
      operation,
      operand,
      previousResult: _result,
      newResult: result
    });
    
    // Keep only last 10 operations
    if (_history.length > 10) {
      _history.shift();
    }
  }
  
  function _add(value) {
    const oldResult = _result;
    _result = _round(_result + value);
    _recordOperation('ADD', value, _result);
    console.log(`    ➕ ${oldResult} + ${value} = ${_result}`);
    return _result;
  }
  
  function _subtract(value) {
    const oldResult = _result;
    _result = _round(_result - value);
    _recordOperation('SUBTRACT', value, _result);
    console.log(`    ➖ ${oldResult} - ${value} = ${_result}`);
    return _result;
  }
  
  function _multiply(value) {
    const oldResult = _result;
    _result = _round(_result * value);
    _recordOperation('MULTIPLY', value, _result);
    console.log(`    ✖️ ${oldResult} × ${value} = ${_result}`);
    return _result;
  }
  
  function _divide(value) {
    if (value === 0) {
      console.log(`    ❌ Cannot divide by zero`);
      return _result;
    }
    
    const oldResult = _result;
    _result = _round(_result / value);
    _recordOperation('DIVIDE', value, _result);
    console.log(`    ➗ ${oldResult} ÷ ${value} = ${_result}`);
    return _result;
  }
  
  function _clear() {
    _result = 0;
    console.log(`    🧹 Calculator cleared`);
  }
  
  function _getResult() {
    return _result;
  }
  
  function _getHistory() {
    return [..._history]; // Return copy
  }
  
  function _setPrecision(precision) {
    if (Number.isInteger(precision) && precision >= 0 && precision <= 10) {
      _precision = precision;
      console.log(`    🎯 Precision set to ${_precision} decimal places`);
    } else {
      console.log(`    ❌ Invalid precision: ${precision}`);
    }
  }
  
  function _chainable() {
    return {
      add: (val) => { _add(val); return _chainable(); },
      subtract: (val) => { _subtract(val); return _chainable(); },
      multiply: (val) => { _multiply(val); return _chainable(); },
      divide: (val) => { _divide(val); return _chainable(); },
      result: () => _result
    };
  }
  
  // Public API - only expose what should be public
  return {
    add: _add,
    subtract: _subtract,
    multiply: _multiply,
    divide: _divide,
    clear: _clear,
    getResult: _getResult,
    getHistory: _getHistory,
    setPrecision: _setPrecision,
    chain: _chainable
  };
})();

console.log("🧮 Testing Calculator Module:");
CalculatorModule.add(10);
CalculatorModule.multiply(2);
CalculatorModule.subtract(5);
CalculatorModule.divide(3);
CalculatorModule.setPrecision(4);
CalculatorModule.divide(3);

console.log(`  📊 Final result: ${CalculatorModule.getResult()}`);
console.log(`  📋 History entries: ${CalculatorModule.getHistory().length}`);

// Test chainable interface
console.log("🔗 Testing chainable interface:");
const chainResult = CalculatorModule.chain()
  .add(100)
  .multiply(2)
  .subtract(50)
  .divide(5)
  .result();
console.log(`  Chain result: ${chainResult}`);

// 2. 🏭 FACTORY PATTERN WITH ENCAPSULATION

console.log("\n2. 🏭 Factory Pattern with Encapsulation");

function createSmartDevice(type, name, initialSettings = {}) {
  // Private state
  let _type = type;
  let _name = name;
  let _isOn = false;
  let _settings = { ...initialSettings };
  let _eventLog = [];
  let _id = Math.random().toString(36).substr(2, 9);
  
  // Private methods
  function _logEvent(event, data = {}) {
    _eventLog.push({
      timestamp: new Date().toISOString(),
      event,
      data
    });
    console.log(`    📝 [${_name}] ${event}:`, data);
  }
  
  function _validateSetting(key, value) {
    const validators = {
      brightness: (val) => Number.isInteger(val) && val >= 0 && val <= 100,
      volume: (val) => Number.isInteger(val) && val >= 0 && val <= 100,
      temperature: (val) => Number.isInteger(val) && val >= 10 && val <= 40,
      channel: (val) => Number.isInteger(val) && val >= 1 && val <= 999
    };
    
    return validators[key] ? validators[key](value) : true;
  }
  
  // Type-specific behavior
  const _behaviors = {
    light: {
      turnOn: () => {
        if (!_settings.brightness) _settings.brightness = 75;
        _logEvent('Light turned on', { brightness: _settings.brightness });
      },
      turnOff: () => {
        _logEvent('Light turned off');
      },
      getStatus: () => `${_isOn ? 'ON' : 'OFF'} (Brightness: ${_settings.brightness || 0}%)`
    },
    
    speaker: {
      turnOn: () => {
        if (!_settings.volume) _settings.volume = 50;
        _logEvent('Speaker turned on', { volume: _settings.volume });
      },
      turnOff: () => {
        _logEvent('Speaker turned off');
      },
      getStatus: () => `${_isOn ? 'PLAYING' : 'SILENT'} (Volume: ${_settings.volume || 0}%)`
    },
    
    thermostat: {
      turnOn: () => {
        if (!_settings.temperature) _settings.temperature = 22;
        _logEvent('Thermostat activated', { temperature: _settings.temperature });
      },
      turnOff: () => {
        _logEvent('Thermostat deactivated');
      },
      getStatus: () => `${_isOn ? 'ACTIVE' : 'INACTIVE'} (Target: ${_settings.temperature || '--'}°C)`
    },
    
    tv: {
      turnOn: () => {
        if (!_settings.channel) _settings.channel = 1;
        if (!_settings.volume) _settings.volume = 25;
        _logEvent('TV turned on', { channel: _settings.channel, volume: _settings.volume });
      },
      turnOff: () => {
        _logEvent('TV turned off');
      },
      getStatus: () => `${_isOn ? 'ON' : 'OFF'} (Channel: ${_settings.channel || '--'}, Volume: ${_settings.volume || 0}%)`
    }
  };
  
  const behavior = _behaviors[_type] || _behaviors.light;
  
  // Public interface
  return {
    // Device identification
    getId: () => _id,
    getName: () => _name,
    getType: () => _type,
    
    // Power control
    turnOn: function() {
      if (!_isOn) {
        _isOn = true;
        behavior.turnOn();
      } else {
        console.log(`    ⚠️ ${_name} is already on`);
      }
      return this; // Enable chaining
    },
    
    turnOff: function() {
      if (_isOn) {
        _isOn = false;
        behavior.turnOff();
      } else {
        console.log(`    ⚠️ ${_name} is already off`);
      }
      return this;
    },
    
    toggle: function() {
      return _isOn ? this.turnOff() : this.turnOn();
    },
    
    isOn: () => _isOn,
    
    // Settings management
    setSetting: function(key, value) {
      if (_validateSetting(key, value)) {
        const oldValue = _settings[key];
        _settings[key] = value;
        _logEvent('Setting updated', { setting: key, oldValue, newValue: value });
        
        // Some settings might affect behavior immediately
        if (_isOn && (key === 'brightness' || key === 'volume' || key === 'temperature')) {
          console.log(`    🔧 ${key.charAt(0).toUpperCase() + key.slice(1)} adjusted to ${value}${key === 'temperature' ? '°C' : '%'}`);
        }
      } else {
        console.log(`    ❌ Invalid ${key}: ${value}`);
      }
      return this;
    },
    
    getSetting: (key) => _settings[key],
    
    getAllSettings: () => ({ ..._settings }),
    
    // Status and diagnostics
    getStatus: function() {
      return {
        id: _id,
        name: _name,
        type: _type,
        status: behavior.getStatus(),
        settings: { ..._settings }
      };
    },
    
    getEventLog: function(limit = 5) {
      return _eventLog.slice(-limit).map(entry => ({
        timestamp: entry.timestamp,
        event: entry.event,
        data: { ...entry.data }
      }));
    },
    
    // Advanced features
    createScene: function(sceneName, settings) {
      const scene = { ...settings };
      console.log(`    🎬 Scene '${sceneName}' created for ${_name}`);
      
      return {
        activate: () => {
          Object.entries(scene).forEach(([key, value]) => {
            this.setSetting(key, value);
          });
          _logEvent('Scene activated', { scene: sceneName, settings: scene });
        }
      };
    }
  };
}

// Test Smart Device Factory
console.log("🏠 Testing Smart Device Factory:");

const livingRoomLight = createSmartDevice('light', 'Living Room Light', { brightness: 80 });
const kitchenSpeaker = createSmartDevice('speaker', 'Kitchen Speaker', { volume: 60 });
const bedroomThermostat = createSmartDevice('thermostat', 'Bedroom Thermostat', { temperature: 24 });
const livingRoomTV = createSmartDevice('tv', 'Living Room TV');

// Test device operations
livingRoomLight.turnOn().setSetting('brightness', 90);
kitchenSpeaker.turnOn().setSetting('volume', 75);
bedroomThermostat.turnOn().setSetting('temperature', 26);
livingRoomTV.turnOn().setSetting('channel', 5).setSetting('volume', 35);

console.log("📊 Device statuses:");
console.log(`  Light: ${livingRoomLight.getStatus().status}`);
console.log(`  Speaker: ${kitchenSpeaker.getStatus().status}`);
console.log(`  Thermostat: ${bedroomThermostat.getStatus().status}`);
console.log(`  TV: ${livingRoomTV.getStatus().status}`);

// Test scene creation
const movieNight = livingRoomTV.createScene('Movie Night', { 
  volume: 45, 
  channel: 10 
});

const dimLighting = livingRoomLight.createScene('Dim Lighting', { 
  brightness: 20 
});

console.log("🎬 Activating scenes:");
movieNight.activate();
dimLighting.activate();

// 3. 🌟 NAMESPACE PATTERN WITH NESTED MODULES

console.log("\n3. 🌟 Namespace Pattern with Nested Modules");

const MyApp = (function(global) {
  // Private app-wide variables
  let _appVersion = '1.0.0';
  let _initialized = false;
  let _config = {};
  
  // Private utility functions
  function _log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, data);
  }
  
  function _validateConfig(config) {
    const required = ['apiUrl', 'appName'];
    return required.every(key => config.hasOwnProperty(key));
  }
  
  // User Management Module
  const UserModule = (function() {
    let _currentUser = null;
    let _users = new Map();
    let _sessions = new Map();
    
    function _generateSessionId() {
      return Math.random().toString(36).substr(2, 16);
    }
    
    function _hashPassword(password) {
      // In real app, use proper hashing
      return btoa(password).split('').reverse().join('');
    }
    
    return {
      register: function(username, email, password) {
        if (_users.has(username)) {
          _log('error', 'User registration failed', { username, reason: 'already exists' });
          return false;
        }
        
        const user = {
          username,
          email,
          passwordHash: _hashPassword(password),
          createdAt: new Date().toISOString(),
          lastLogin: null
        };
        
        _users.set(username, user);
        _log('info', 'User registered', { username, email });
        return true;
      },
      
      login: function(username, password) {
        const user = _users.get(username);
        
        if (!user || user.passwordHash !== _hashPassword(password)) {
          _log('error', 'Login failed', { username, reason: 'invalid credentials' });
          return null;
        }
        
        const sessionId = _generateSessionId();
        user.lastLogin = new Date().toISOString();
        
        _sessions.set(sessionId, { username, loginTime: new Date() });
        _currentUser = { username, sessionId };
        
        _log('info', 'User logged in', { username, sessionId });
        return sessionId;
      },
      
      logout: function() {
        if (_currentUser) {
          _sessions.delete(_currentUser.sessionId);
          _log('info', 'User logged out', { username: _currentUser.username });
          _currentUser = null;
          return true;
        }
        return false;
      },
      
      getCurrentUser: () => _currentUser ? { ..._currentUser } : null,
      
      isLoggedIn: () => _currentUser !== null,
      
      getUserCount: () => _users.size,
      
      getSessionCount: () => _sessions.size
    };
  })();
  
  // Data Management Module
  const DataModule = (function() {
    let _cache = new Map();
    let _cacheTTL = 5 * 60 * 1000; // 5 minutes
    
    function _isCacheValid(entry) {
      return Date.now() - entry.timestamp < _cacheTTL;
    }
    
    function _getCacheKey(endpoint, params) {
      return endpoint + JSON.stringify(params || {});
    }
    
    return {
      fetchData: async function(endpoint, params = {}) {
        const cacheKey = _getCacheKey(endpoint, params);
        const cached = _cache.get(cacheKey);
        
        if (cached && _isCacheValid(cached)) {
          _log('info', 'Cache hit', { endpoint, params });
          return Promise.resolve(cached.data);
        }
        
        _log('info', 'Fetching data', { endpoint, params });
        
        // Simulate API call
        return new Promise(resolve => {
          setTimeout(() => {
            const mockData = { 
              endpoint, 
              params, 
              data: `Mock data for ${endpoint}`,
              timestamp: new Date().toISOString()
            };
            
            _cache.set(cacheKey, { data: mockData, timestamp: Date.now() });
            _log('info', 'Data fetched and cached', { endpoint });
            resolve(mockData);
          }, 100);
        });
      },
      
      clearCache: function() {
        _cache.clear();
        _log('info', 'Cache cleared');
      },
      
      setCacheTTL: function(ttlMs) {
        _cacheTTL = ttlMs;
        _log('info', 'Cache TTL updated', { ttlMs });
      },
      
      getCacheStats: function() {
        let validEntries = 0;
        let expiredEntries = 0;
        
        _cache.forEach(entry => {
          if (_isCacheValid(entry)) {
            validEntries++;
          } else {
            expiredEntries++;
          }
        });
        
        return { total: _cache.size, valid: validEntries, expired: expiredEntries };
      }
    };
  })();
  
  // UI Module
  const UIModule = (function() {
    let _theme = 'light';
    let _notifications = [];
    let _maxNotifications = 5;
    
    return {
      setTheme: function(theme) {
        if (['light', 'dark', 'auto'].includes(theme)) {
          _theme = theme;
          _log('info', 'Theme changed', { theme });
          
          // Simulate DOM update
          console.log(`    🎨 UI theme changed to: ${theme}`);
        }
      },
      
      getTheme: () => _theme,
      
      showNotification: function(message, type = 'info') {
        const notification = {
          id: Date.now(),
          message,
          type,
          timestamp: new Date().toISOString()
        };
        
        _notifications.unshift(notification);
        
        // Keep only recent notifications
        if (_notifications.length > _maxNotifications) {
          _notifications = _notifications.slice(0, _maxNotifications);
        }
        
        console.log(`    🔔 ${type.toUpperCase()}: ${message}`);
        return notification.id;
      },
      
      getNotifications: () => [..._notifications],
      
      clearNotifications: function() {
        _notifications = [];
        console.log(`    🧹 Notifications cleared`);
      }
    };
  })();
  
  // Public API
  return {
    // App lifecycle
    init: function(config) {
      if (_initialized) {
        _log('warn', 'App already initialized');
        return false;
      }
      
      if (!_validateConfig(config)) {
        _log('error', 'Invalid configuration');
        return false;
      }
      
      _config = { ...config };
      _initialized = true;
      
      _log('info', 'App initialized', { version: _appVersion, config: config.appName });
      UIModule.showNotification(`${config.appName} v${_appVersion} initialized`, 'success');
      
      return true;
    },
    
    isInitialized: () => _initialized,
    
    getVersion: () => _appVersion,
    
    getConfig: () => ({ ..._config }),
    
    // Module access
    User: UserModule,
    Data: DataModule,
    UI: UIModule,
    
    // Global utilities
    log: _log,
    
    // App status
    getStatus: function() {
      return {
        initialized: _initialized,
        version: _appVersion,
        users: UserModule.getUserCount(),
        sessions: UserModule.getSessionCount(),
        cache: DataModule.getCacheStats(),
        theme: UIModule.getTheme(),
        notifications: UIModule.getNotifications().length
      };
    }
  };
})(window || global || this);

// Test Namespace Pattern
console.log("🌟 Testing MyApp Namespace:");

// Initialize app
MyApp.init({
  apiUrl: 'https://api.example.com',
  appName: 'MyAwesomeApp'
});

// Test User module
MyApp.User.register('john_doe', 'john@example.com', 'password123');
MyApp.User.register('jane_smith', 'jane@example.com', 'secret456');
MyApp.User.login('john_doe', 'password123');

// Test Data module
MyApp.Data.fetchData('/api/users').then(data => {
  console.log('    📡 Received data:', data);
});

MyApp.Data.fetchData('/api/posts', { page: 1 }).then(data => {
  console.log('    📡 Received data:', data);
});

// Test UI module
MyApp.UI.setTheme('dark');
MyApp.UI.showNotification('Welcome to the app!', 'success');
MyApp.UI.showNotification('Don\'t forget to save your work', 'info');

// Check app status
setTimeout(() => {
  console.log('📊 App Status:', MyApp.getStatus());
}, 200);

console.log("\n🎓 Encapsulation patterns examples complete!");
console.log("💡 Key takeaways:");
console.log("   - Revealing Module Pattern exposes only necessary functions");
console.log("   - Factory Pattern creates objects with private state and behavior");
console.log("   - Namespace Pattern organizes large applications into modules");
console.log("   - Private variables and functions provide true encapsulation");
console.log("   - Each pattern solves different architectural challenges");
console.log("   - Modern JavaScript provides alternatives, but these patterns remain valuable");

// 📚 DESIGN PATTERN COMPARISON:

/*
ENCAPSULATION PATTERN COMPARISON:

1. REVEALING MODULE PATTERN:
✅ Pros:
- Clear separation of public/private
- Single instance (singleton-like)
- Good performance (methods defined once)
- Easy to understand

❌ Cons:
- Cannot create multiple instances
- Hard to extend or inherit
- All private members shared

Best for: Utilities, singletons, app-wide services

2. FACTORY PATTERN:
✅ Pros:
- Creates multiple instances
- Each instance has private state
- Flexible and extensible
- Good encapsulation

❌ Cons:
- Memory overhead (methods recreated per instance)
- More complex than simple objects
- Can be overkill for simple cases

Best for: Creating similar objects with private state

3. NAMESPACE PATTERN:
✅ Pros:
- Prevents global namespace pollution
- Organizes large codebases
- Modular architecture
- Hierarchical structure

❌ Cons:
- Can become complex
- Harder to test individual parts
- Potential for tight coupling

Best for: Large applications, libraries

4. CLOSURE-BASED CLASSES:
✅ Pros:
- True privacy
- Flexible method definition
- Can implement complex patterns
- Works in all JavaScript versions

❌ Cons:
- Memory usage (closures keep references)
- Debugging can be harder
- Performance implications

Best for: When true privacy is essential

MODERN ALTERNATIVES:

1. ES6 Classes with Private Fields:
class MyClass {
  #privateField = 0;
  
  #privateMethod() {
    return this.#privateField;
  }
  
  publicMethod() {
    return this.#privateMethod();
  }
}

2. ES6 Modules:
// module.js
let privateVar = 0;
export function publicFunction() {
  return privateVar;
}

3. WeakMap for Privacy:
const privateData = new WeakMap();
class MyClass {
  constructor() {
    privateData.set(this, { secret: 'value' });
  }
}

CHOOSING THE RIGHT PATTERN:

Consider:
- Browser support requirements
- Team familiarity
- Application size and complexity
- Performance requirements
- Testability needs
- Maintenance considerations

MIGRATION STRATEGY:
- Start with closure patterns for compatibility
- Gradually adopt ES6+ features as support allows
- Use TypeScript for better tooling and type safety
- Consider bundlers and transpilers for modern syntax
*/