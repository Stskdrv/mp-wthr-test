import { getUserPosition } from "../utils";

beforeAll(() => {
    // Mocking geolocation within the global navigator object
    Object.defineProperty(global.navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn(),
      },
      configurable: true,
    });
  });
  
describe('getuserPosition', () => {
    it('returns user position when geolocation is available', async () => {
      const mockPosition = {
        coords: {
          latitude: 12.345,
          longitude: 67.890,
        },
      };
  
      // Mocking the resolved value of getCurrentPosition
      (navigator.geolocation.getCurrentPosition as jest.Mock).mockImplementationOnce((successCallback) => {
        successCallback(mockPosition);
      });
  
      const result = await getUserPosition();
  
      expect(result).toEqual({ lat: 12.345, lng: 67.890 });
    });
  
    it('throws an error when geolocation is not available', async () => {
      const mockError = new Error('Geolocation error');
  
      // Mocking the rejected value of getCurrentPosition
      (navigator.geolocation.getCurrentPosition as jest.Mock).mockImplementationOnce((_, errorCallback) => {
        errorCallback(mockError);
      });
  
      await expect(getUserPosition()).rejects.toThrowError('Geolocation error');
    });
  });