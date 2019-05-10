const EventEmitter = require('events').EventEmitter;

class MockLiveLook extends EventEmitter {
    constructor(args) {
        super();

        this.username = args.username;
        this.password = args.password;
    }

    login(done) {
        let success = (Math.random() * 100) > 10;

        setTimeout(() => {
            this.emit('loggedIn', success);
            done(null, success);
        }, (Math.random() * 5000));
    }

    sayChatroom(room, message) {
        setTimeout(() => {
            this.emit('sayChatroom', {
                username: this.username, room, message
            });
        }, 250);
    }

    leaveChatroom(room) {
    }

    joinRoom(room) {
    }

    messageUser(username, message) {
    }

    setStatus(status) {
    }
}

module.exports = MockLiveLook;
