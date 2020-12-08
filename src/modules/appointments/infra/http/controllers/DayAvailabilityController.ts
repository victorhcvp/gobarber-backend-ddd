import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListDayAvailabilityService from '@modules/appointments/services/ListDayAvailabilityService';

export default class DayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvailability = container.resolve(
      ListDayAvailabilityService,
    );

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      month,
      day,
      year,
    });

    return response.json(availability);
  }
}
