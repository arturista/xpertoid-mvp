// services/StorageService.js
export class StorageService {
    constructor() { 
        this.dbName = "XpertoidDB"; 
        this.dbVersion = 1; 
        this.db = null; 
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('data')) {
                    db.createObjectStore('data', { keyPath: 'id' });
                }
            };
            
            request.onsuccess = (e) => { 
                this.db = e.target.result; 
                resolve(); 
            };
            
            request.onerror = (e) => {
                console.error("Erro no IndexedDB:", e);
                reject("Falha ao iniciar banco de dados local.");
            };
        });
    }

    async saveAll(appState) {
        return new Promise((resolve, reject) => {
            try {
                const transaction = this.db.transaction(['data'], 'readwrite');
                const store = transaction.objectStore('data');
                store.put({ id: 'state', ...appState });
                transaction.oncomplete = () => resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    async loadAppState() {
        return new Promise((resolve) => {
            const transaction = this.db.transaction(['data'], 'readonly');
            const request = transaction.objectStore('data').get('state');
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve(null);
        });
    }
}