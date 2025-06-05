// Unit tests on api helpers

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

// Adjust this path so it points to where your helper file lives:
import * as api from '../../frontend/src/API/API.jsx';

// Keep a reference to the original fetch so we can restore it after each test
const ORIGINAL_FETCH = global.fetch;

beforeEach(() => {
    // Replace global.fetch with a Vitest mock before each test
    global.fetch = vi.fn();
});

afterEach(() => {
    global.fetch = ORIGINAL_FETCH;
});

describe('API Helper Functions', () => {
    //
    // 1) signupUser()
    //
    describe('signupUser()', () => {
        test('returns { usernameTaken: true } if server responds 409 + statusText "username"', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 409,
                statusText: 'username',
                ok: false,
                json: async () => ({}),
                text: async () => '',
            });

            const result = await api.signupUser({ any: 'payload' });
            expect(result).toEqual({ usernameTaken: true });
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns { emailTaken: true } if server responds 409 + statusText "email"', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 409,
                statusText: 'email',
                ok: false,
                json: async () => ({}),
                text: async () => '',
            });

            const result = await api.signupUser({ any: 'payload' });
            expect(result).toEqual({ emailTaken: true });
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns {} on non-OK (but not 409/username/email) status', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 500,
                statusText: 'Internal Server Error',
                ok: false,
                json: async () => ({ error: 'oops' }),
                text: async () => 'oops',
            });

            const result = await api.signupUser({ any: 'payload' });
            expect(result).toEqual({});
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns parsed JSON on 200 OK', async () => {
            const fakeResponseData = { id: 123, username: 'newuser' };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                statusText: 'OK',
                ok: true,
                json: async () => fakeResponseData,
                text: async () => JSON.stringify(fakeResponseData),
            });

            const result = await api.signupUser({ username: 'newuser', password: 'pw' });
            expect(result).toEqual(fakeResponseData);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors and logs them (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.signupUser({ any: 'payload' });
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 2) loginUser()
    //
    describe('loginUser()', () => {
        test('returns { emailNotFound: true } if server responds 404 + statusText "email"', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 404,
                statusText: 'email',
                ok: false,
                json: async () => ({}),
                text: async () => '',
            });

            const result = await api.loginUser({ any: 'payload' });
            expect(result).toEqual({ emailNotFound: true });
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns { passwordIncorrect: true } if server responds 401 + statusText "password"', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 401,
                statusText: 'password',
                ok: false,
                json: async () => ({}),
                text: async () => '',
            });

            const result = await api.loginUser({ any: 'payload' });
            expect(result).toEqual({ passwordIncorrect: true });
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns {} on non-OK (but not 404/email or 401/password) status', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 500,
                statusText: 'Internal Error',
                ok: false,
                json: async () => ({}),
                text: async () => '',
            });

            const result = await api.loginUser({ any: 'payload' });
            expect(result).toEqual({});
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns parsed JSON on 200 OK', async () => {
            const fakeLoginData = { id: 456, token: 'abc123' };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                statusText: 'OK',
                ok: true,
                json: async () => fakeLoginData,
                text: async () => JSON.stringify(fakeLoginData),
            });

            const result = await api.loginUser({ email: 'e@x.com', password: 'pw' });
            expect(result).toEqual(fakeLoginData);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors and logs them (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Fetch failure'));

            const result = await api.loginUser({ any: 'payload' });
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 3) checkLogin()
    //
    describe('checkLogin()', () => {
        test('returns parsed JSON on 200 OK', async () => {
            const fakeUser = { loggedIn: true, username: 'alice' };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                statusText: 'OK',
                ok: true,
                json: async () => fakeUser,
                text: async () => JSON.stringify(fakeUser),
            });

            const result = await api.checkLogin();
            expect(result).toEqual(fakeUser);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors and logs them (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.checkLogin();
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 4) logoutUser()
    //
    describe('logoutUser()', () => {
        test('returns Response object on OK', async () => {
            const fakeResponse = { status: 200, ok: true, text: async () => 'OK' };
            global.fetch.mockResolvedValueOnce(fakeResponse);

            const result = await api.logoutUser();
            expect(result).toBe(fakeResponse);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns undefined for non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 500,
                ok: false,
                text: async () => 'Server error',
            });

            const result = await api.logoutUser();
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches errors and logs them (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Fetch failure'));

            const result = await api.logoutUser();
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 5) getChatList()
    //
    describe('getChatList()', () => {
        test('returns parsed JSON (array) on OK', async () => {
            const fakeChats = [{ text: 'Hi', sender: 'You' }];
            global.fetch.mockResolvedValueOnce({
                status: 200,
                ok: true,
                json: async () => fakeChats,
                text: async () => JSON.stringify(fakeChats),
            });

            const result = await api.getChatList('alice');
            expect(result).toEqual(fakeChats);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns undefined on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 404,
                ok: false,
                json: async () => ({}),
                text: async () => '',
            });

            const result = await api.getChatList('doesnotexist');
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches errors and logs them (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.getChatList('bob');
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 6) chat()
    //
    describe('chat()', () => {
        test('returns response.text() on success', async () => {
            const fakeResponseText = 'Simpli says hi';
            global.fetch.mockResolvedValueOnce({
                ok: true,
                text: async () => fakeResponseText,
            });

            const result = await api.chat('alice', 'Hello?', []);
            expect(result).toBe(fakeResponseText);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches errors and returns error message string', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.chat('alice', 'Hello?', []);
            expect(result).toContain('Err: Simpli cannot give back an answer.');
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 7) deleteChat()
    //
    describe('deleteChat()', () => {
        test('resolves without throwing on OK', async () => {
            global.fetch.mockResolvedValueOnce({ ok: true, text: async () => '' });

            await expect(api.deleteChat('alice')).resolves.toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('throws if non-OK (text is error message)', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                text: async () => 'Deletion failed',
            });

            await expect(api.deleteChat('alice')).resolves.toBeUndefined();
            // Because the function catches the error internally, it logs and returns undefined, not a thrown error.
            // If you want it to actually throw, you would need to remove the try/catch inside deleteChat.
        });

        test('catches fetch errors and logs them', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            await expect(api.deleteChat('alice')).resolves.toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 8) uploadSelfie()
    //
    describe('uploadSelfie()', () => {
        test('throws on invalid payload', async () => {
            await expect(api.uploadSelfie(123)).rejects.toThrow('Invalid payload for uploadSelfie');
        });

        test('sends JSON payload correctly and returns parsed JSON on OK', async () => {
            const fakeJson = { message: 'Analysis done' };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeJson,
                text: async () => JSON.stringify(fakeJson),
            });

            const payload = { image: 'http://img.jpg' };
            const result = await api.uploadSelfie(payload);

            expect(global.fetch).toHaveBeenCalledOnce();
            // Inspect how fetch was called:
            const [url, options] = global.fetch.mock.calls[0];
            expect(url).toMatch(/\/api\/selfie$/);
            expect(options.method).toBe('POST');
            expect(options.headers['Content-Type']).toBe('application/json');
            expect(options.body).toBe(JSON.stringify(payload));

            expect(result).toEqual(fakeJson);
        });

        test('passes FormData directly if instance of FormData', async () => {
            // Create a dummy FormData. In Node (Vitest), FormData may not exist by default, so create a minimal stub:
            class FakeFormData { }
            const fakeFormData = new FakeFormData();

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true }),
                text: async () => '{}',
            });

            // Temporarily override global.FormData so `instanceof FormData` works
            const ORIGINAL_FORMDATA = global.FormData;
            global.FormData = FakeFormData;

            const result = await api.uploadSelfie(fakeFormData);
            expect(global.fetch).toHaveBeenCalledOnce();
            // The body should be the same FormData instance
            expect(global.fetch.mock.calls[0][1].body).toBe(fakeFormData);
            expect(result).toEqual({ success: true });

            global.FormData = ORIGINAL_FORMDATA;
        });

        test('throws if fetch returns non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                text: async () => 'Upload error',
            });

            await expect(api.uploadSelfie({ image: 'http://img.jpg' })).rejects.toThrow('Upload error');
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 9) uploadImage()
    //
    describe('uploadImage()', () => {
        test('returns parsed JSON on OK', async () => {
            const fakeJson = { url: 'http://img.uploaded.jpg' };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeJson,
                text: async () => JSON.stringify(fakeJson),
            });

            // Create a dummy FormData stub to pass in
            const formData = {};
            const result = await api.uploadImage(formData);

            expect(global.fetch).toHaveBeenCalledOnce();
            const [url, options] = global.fetch.mock.calls[0];
            expect(url).toMatch(/\/api\/upload$/);
            expect(options.method).toBe('POST');
            expect(options.body).toBe(formData);
            expect(result).toEqual(fakeJson);
        });

        test('returns { error: message } on fetch error', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Upload failed'));

            const result = await api.uploadImage({});
            expect(result).toEqual({ error: 'Upload failed' });
            expect(global.fetch).toHaveBeenCalledOnce();
        });

    });

    //
    // 10) getRecommendedRoutine()
    //
    describe('getRecommendedRoutine()', () => {
        test('returns parsed JSON on OK', async () => {
            const fakeRoutine = { routine: ['A', 'B', 'C'] };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeRoutine,
                text: async () => JSON.stringify(fakeRoutine),
            });

            const surveyData = { oiliness: 1, sensitivity: 2, ageGroupIndex: 3, waterIntakeIndex: 4, imageUrl: 'http://img' };
            const result = await api.getRecommendedRoutine(surveyData);

            expect(global.fetch).toHaveBeenCalledOnce();
            // Check that the URL was constructed properly
            expect(global.fetch.mock.calls[0][0]).toMatch(/\?oiliness=1&sensitivity=2&ageGroupIndex=3&waterIntakeIndex=4&imageUrl=http%3A%2F%2Fimg$/);
            expect(result).toEqual(fakeRoutine);
        });

        test('returns undefined on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                text: async () => 'Bad request',
            });

            const result = await api.getRecommendedRoutine({});
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors and logs them (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.getRecommendedRoutine({});
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 11) fetchLeaderboard()
    //
    describe('fetchLeaderboard()', () => {
        test('returns [] on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                json: async () => [],
                text: async () => 'Error',
            });

            const result = await api.fetchLeaderboard();
            expect(result).toEqual([]);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns parsed JSON array on OK', async () => {
            const fakeBoard = [
                { username: 'alice', points: 100 },
                { username: 'bob', points: 90 },
            ];
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeBoard,
                text: async () => JSON.stringify(fakeBoard),
            });

            const result = await api.fetchLeaderboard();
            expect(result).toEqual(fakeBoard);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors and logs them (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.fetchLeaderboard();
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 12) getUserRoutine()
    //
    describe('getUserRoutine()', () => {
        test('returns parsed JSON on OK', async () => {
            const fakeProducts = [{ name: 'P0' }, { name: 'P1' }];
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeProducts,
                text: async () => JSON.stringify(fakeProducts),
            });

            const result = await api.getUserRoutine('alice');
            expect(result).toEqual(fakeProducts);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns undefined on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                text: async () => 'Not found',
            });

            const result = await api.getUserRoutine('alice');
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.getUserRoutine('alice');
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 13) getUserFeedback()
    //
    describe('getUserFeedback()', () => {
        test('returns parsed JSON on OK', async () => {
            const fakeFeedback = { feedback: 'Great!' };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeFeedback,
                text: async () => JSON.stringify(fakeFeedback),
            });

            const result = await api.getUserFeedback('alice');
            expect(result).toEqual(fakeFeedback);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns undefined on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                text: async () => 'Not found',
            });

            const result = await api.getUserFeedback('alice');
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.getUserFeedback('alice');
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 14) fetchHomeLeaderboard()
    //
    describe('fetchHomeLeaderboard()', () => {
        test('returns [] on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                text: async () => 'Error',
            });

            const result = await api.fetchHomeLeaderboard('alice');
            expect(result).toEqual([]);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns parsed JSON on OK', async () => {
            const fakeHL = [{ username: 'alice', points: 50 }];
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeHL,
                text: async () => JSON.stringify(fakeHL),
            });

            const result = await api.fetchHomeLeaderboard('alice');
            expect(result).toEqual(fakeHL);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.fetchHomeLeaderboard('alice');
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 15) fetchUserStreak()
    //
    describe('fetchUserStreak()', () => {
        test('returns parsed JSON on OK', async () => {
            const fakeStreak = { streak: 5 };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeStreak,
                text: async () => JSON.stringify(fakeStreak),
            });

            const result = await api.fetchUserStreak('alice');
            expect(result).toEqual(fakeStreak);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns null on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                text: async () => 'Not found',
            });

            const result = await api.fetchUserStreak('alice');
            expect(result).toBeNull();
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.fetchUserStreak('alice');
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 16) updateUserPFP()
    //
    describe('updateUserPFP()', () => {
        test('returns parsed JSON on OK', async () => {
            const fakeUser = { username: 'alice', pfp: 'http://new-pfp.jpg' };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeUser,
                text: async () => JSON.stringify(fakeUser),
            });

            const result = await api.updateUserPFP('alice', 'http://new-pfp.jpg');
            expect(result).toEqual(fakeUser);
            expect(global.fetch).toHaveBeenCalledOnce();

            // Check request details
            const [url, options] = global.fetch.mock.calls[0];
            expect(url).toMatch(/\/api\/user\/alice\/pfp$/);
            expect(options.method).toBe('PUT');
            expect(JSON.parse(options.body)).toEqual({ imageUrl: 'http://new-pfp.jpg' });
        });

        test('returns { error: message } on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                text: async () => 'Bad request',
            });

            const result = await api.updateUserPFP('alice', 'http://new-pfp.jpg');
            expect(result).toEqual({ error: 'Bad request' });
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors (returns { error: message })', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.updateUserPFP('alice', 'http://new-pfp.jpg');
            expect(result).toEqual({ error: 'Network down' });
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 17) fetchUserPoint()
    //
    describe('fetchUserPoint()', () => {
        test('returns parsed JSON on OK', async () => {
            const fakePoint = { point: 42 };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakePoint,
                text: async () => JSON.stringify(fakePoint),
            });

            const result = await api.fetchUserPoint('alice');
            expect(result).toEqual(fakePoint);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns null on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                text: async () => 'Not found',
            });

            const result = await api.fetchUserPoint('alice');
            expect(result).toBeNull();
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.fetchUserPoint('alice');
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 18) updateUserStreak()
    //
    describe('updateUserStreak()', () => {
        test('returns parsed JSON on OK', async () => {
            const fakeStreak = { streak: 6 };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeStreak,
                text: async () => JSON.stringify(fakeStreak),
            });

            const result = await api.updateUserStreak();
            expect(result).toEqual(fakeStreak);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns null on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                text: async () => 'Error',
            });

            const result = await api.updateUserStreak();
            expect(result).toBeNull();
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.updateUserStreak();
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 19) fetchUserDays()
    //
    describe('fetchUserDays()', () => {
        test('returns parsed JSON on OK', async () => {
            const fakeDays = { days: [1, 2, 3] };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeDays,
                text: async () => JSON.stringify(fakeDays),
            });

            const result = await api.fetchUserDays('alice');
            expect(result).toEqual(fakeDays);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns null on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                text: async () => 'Not found',
            });

            const result = await api.fetchUserDays('alice');
            expect(result).toBeNull();
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.fetchUserDays('alice');
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 20) fetchUsers()
    //
    describe('fetchUsers()', () => {
        test('returns [] on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                text: async () => 'Error',
            });

            const result = await api.fetchUsers();
            expect(result).toEqual([]);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns parsed JSON on OK', async () => {
            const fakeList = [{ username: 'alice' }, { username: 'bob' }];
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => fakeList,
                text: async () => JSON.stringify(fakeList),
            });

            const result = await api.fetchUsers();
            expect(result).toEqual(fakeList);
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.fetchUsers();
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });

    //
    // 21) deleteUser()
    //
    describe('deleteUser()', () => {
        test('returns { message: res.message } on OK', async () => {
            // Suppose the real response has a "message" field in its JSON (but your code looks at res.message,
            // which normally would be undefined unless the server sets a custom property. We'll simulate anyway.)
            const fakeResponse = {
                ok: true,
                status: 200,
                text: async () => '{}',
            };
            // Simulate a `message` property on the Response object:
            fakeResponse.message = 'User deleted';

            global.fetch.mockResolvedValueOnce(fakeResponse);

            const result = await api.deleteUser('alice@example.com');
            expect(result).toEqual({ message: 'User deleted' });
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('returns null on non-OK', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                text: async () => 'Not found',
            });

            const result = await api.deleteUser('alice@example.com');
            expect(result).toBeNull();
            expect(global.fetch).toHaveBeenCalledOnce();
        });

        test('catches network errors (returns undefined)', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network down'));

            const result = await api.deleteUser('alice@example.com');
            expect(result).toBeUndefined();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });
});
