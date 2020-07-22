// describe('my test', () => {
//   it('returns true', () => {
//       expect(true).toEqual(true);
//   });
// });

// feature
class FriendsList {
    friends = [];

    addFriend(name) {
        this.friends.push(name);
        this.announceFriendship(name);
    }

    announceFriendship(name) {
        console.log(`${name} is a friend!`);
    }

    removeFriend(name) {
        const idx = this.friends.indexOf(name);
        
        if (idx === -1) {
            throw new Error(`Friend ${name} not found`);
        }
        
        this.friends.splice(idx, 1);
    }
}

// tests
describe('FriendsList', () => {
    let friendsList;

    beforeEach(() => {
        friendsList = new FriendsList();
    });

    it('initializes friends list', () => {
        expect(friendsList.friends.length).toEqual(0);
    });

    it('adds a friend to the list', () => {
        friendsList.addFriend('Ariel');

        expect(friendsList.friends.length).toEqual(1);  
        expect(friendsList.friends.length).not.toEqual(0);  
    });

    it('announces a friendship', () => {
        friendsList.announceFriendship = jest.fn(); // created a mock function

        expect(friendsList.announceFriendship).not.toHaveBeenCalled();

        friendsList.addFriend('Shani');

        expect(friendsList.announceFriendship).toHaveBeenCalled();
        expect(friendsList.announceFriendship).toHaveBeenCalledWith('Shani');
    });
    
    describe(('remove friend'), () => {
        it(('removes the friend from the list'), () => {
            friendsList.addFriend('Ariel');
            expect(friendsList.friends[0]).toEqual('Ariel');
            friendsList.removeFriend('Ariel');
            expect(friendsList.friends[0]).toBeUndefined();
        });
    
        it(('throws an error as friend not exists'), () => {
            expect(() => friendsList.removeFriend('Ariel')).toThrow(new Error(`Friend Ariel not found`));
        });
    });
});
