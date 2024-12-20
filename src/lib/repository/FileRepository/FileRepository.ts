import { env } from "$env/dynamic/private";
import type { FileRepository } from "$lib/domain/FileRepository";

const FILE_UPLOAD_SERVICE_URL = env.FILE_UPLOAD_SERVICE_URL;

export class CustomFileRepository implements FileRepository {
	async uploadVideo(file: File) {
		const formData = new FormData();
		formData.append("file", file);

		const response = await fetch(`${FILE_UPLOAD_SERVICE_URL}/upload-video`, {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const { permalink } = (await response.json()) as { permalink: string };
			return permalink;
		} else {
			throw new Error("Failed to upload video");
		}
	}

	async uploadImage(file: File) {
		const formData = new FormData();
		formData.append("file", file);

		const response = await fetch(`${FILE_UPLOAD_SERVICE_URL}/upload-image`, {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const { permalink } = (await response.json()) as { permalink: string };

			return permalink;
		} else {
			throw new Error("Failed to upload image");
		}
	}

	async uploadFile(file: File) {
		return this.uploadImage(file);
	}
}
