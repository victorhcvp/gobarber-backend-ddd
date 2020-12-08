// import AppError from '@shared/errors/AppError';
import ListDayAvailability from './ListDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listDayAvailability: ListDayAvailability;

describe('ListDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listDayAvailability = new ListDayAvailability(fakeAppointmentsRepository);
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 8, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 10, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 14, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 15, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 3, 20, 11).getTime();
    });

    const availability = await listDayAvailability.execute({
      provider_id: 'user',
      month: 4,
      day: 20,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
      ]),
    );
  });
});
