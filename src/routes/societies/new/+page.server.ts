import { error, fail, redirect, type RequestEvent, type ServerLoad } from '@sveltejs/kit';
import type { NewSocietyType } from '$lib/types/society';
import societyService from '$lib/services/SocietyService';

export const load: ServerLoad = async ({ locals, parent }) => {
	await parent();

	if (!locals.user) {
		throw error(401, 'You must be logged in to create a new society');
	}
};

export const actions = {
	newSociety: async ({ request, locals }: RequestEvent) => {
		if (!locals.user) {
			return fail(401, {
				description: 'You must be logged in to create a new society',
				error: 'Unauthorized'
			});
		}
		const user = locals.user;

		const data: FormData = await request.formData();

		try {
			const society = Object.fromEntries(data) as unknown as NewSocietyType;
			society.creator = user.web3Address;
			await societyService.save(society);
			throw redirect(301, `/`);
		} catch (error: any) {
			return fail(500, {
				description: data.get('description'),
				error: error.message
			});
		}
	}
};
