Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = {
    "id": "dependent-plugin",
    "name": "sunbird test plugin",
    "author": "sunil<sunils@ilimi.in>",
    "version": "1.0",
    "server": {
        "routes": {
            "prefix": "/profile/5"
        },
        "databases": [{
                "type": "cassandra",
                "path": "db/cassandra",
                "compatibility": "~1.0"
            },
            {
                "type": "es",
                "path": "db/es",
                "compatibility": "~1.0"
            }
        ],
        "dependencies": []
    }
};
