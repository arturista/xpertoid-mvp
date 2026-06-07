// services/StorageService.js
export class StorageService {
    constructor() { this.dbName = "XpertoidDB"; this.dbVersion = 1; this.db = null; }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('data')) db.createObjectStore('data', { keyPath: 'id' });
            };
            request.onsuccess = (e) => { this.db = e.target.result; resolve(); };
            request.onerror = (e) => reject("Erro ao abrir DB");
        });
    }

    async saveAll(appState) {
        return new Promise((resolve) => {
            const transaction = this.db.transaction(['data'], 'readwrite');
            transaction.objectStore('data').put({ id: 'state', ...appState });
            transaction.oncomplete = () => resolve();
        });
    }

    async loadAppState() {
        return new Promise((resolve) => {
            const request = this.db.transaction(['data'], 'readonly').objectStore('data').get('state');
            request.onsuccess = () => resolve(request.result);
        });
    }
}