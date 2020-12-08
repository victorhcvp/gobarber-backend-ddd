// import AppError from '@shared/errors/AppError';
import ListMonthAvailability from './ListMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listMonthAvailability: ListMonthAvailability;

describe('ListMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listMonthAvailability = new ListMonthAvailability(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 8, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 9, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 10, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 11, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 12, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 13, 0, 0),
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
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 16, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 17, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 21, 15, 0, 0),
      provider_id: 'user',
      user_id: 'user-id',
    });

    const availability = await listMonthAvailability.execute({
      provider_id: 'user',
      month: 4,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
      ]),
    );
  });
});
