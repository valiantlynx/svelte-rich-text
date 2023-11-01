import PocketBase from 'pocketbase';
import { authData } from '$lib/utils/stores';
import { goto } from '$app/navigation';
import { site } from '$lib/config/site';
import { writable } from 'svelte/store';

export const pb = new PocketBase(site.pocketbase);

export const currentUser = writable(pb.authStore.model);

export const getImageURL = (collectionId: string, recordId: string, fileName: string, thumb: string) => {
	return `${site.pocketbase}/api/files/${collectionId}/${recordId}/${fileName}?${thumb}`;
};

export const authPocketbase = async (user: string, password: string) => {
	const res = await pb.collection('users_valiantlynx').authWithPassword(user, password);
	authData.set(pb.authStore.model);
	if (!pb.authStore.isValid) {
		throw { status: pb.authStore.isValid, message: pb.authStore.token };
	} else {
		return res;
	}
};

export const logoutPocketbase = async () => {
	pb.authStore.clear();
	authData.set({});
	window.location.reload();
	goto('/');
	if (!pb.authStore.isValid) {
		return { status: 200, message: 'logged out' };
	} else {
		throw { message: 'something went wrong' };
	}
};

export const createPocketbaseUser = async (data: any) => {
	const res = await pb.collection('users_valiantlynx').create(data);
	authData.set(res);

	// (optional) send an email verification request
	await pb.collection('users_valiantlynx').requestVerification(data.email);

	// login the user
	await authPocketbase(data.username, data.password);

	if (!pb.authStore.isValid) {
		throw { status: pb.authStore.isValid, message: pb.authStore.token };
	} else {
		return res;
	}
};

export const authPocketbaseAdmin = async (user: string, password: string) => {
	const res = await pb.admins.authWithPassword(user, password);
	authData.set(res);

	if (!pb.authStore.isValid) {
		throw { status: pb.authStore.isValid, message: pb.authStore.token };
	} else {
		return res;
	}
};

// refresh the login data
export const refreshAuthPocketbase = async () => {
	// Update authData store
	const user = await pb.collection('users_valiantlynx').authRefresh({
		refreshToken: pb.authStore.token
	});
	authData.set(user);

	return user;
};

export const getOnePocketbase = async (collection: string, data: any, id: any) => {
	const resultList = await pb.collection(collection).getOne(id, data);
	return resultList;
};

export const getPocketbase = async (collection: string, data: any, size?: any) => {
	const resultList = await pb.collection(collection).getList(1, size ? size : 8, data);
	return resultList;
};

export const postPocketbase = async (collection: string, data: any) => {
	const resultList = await pb.collection(collection).create(data);
	return resultList;
};

export const patchPocketbase = async (collection: string, id: string, data: any) => {
	const response = await pb.collection(collection).update(id, data);
	return response;
};

export const patchPocketbase1only = async (collection: string, id: string, data: any) => {
	const response = await pb.collection(collection).update(id, data);
	return response;
};

export const getImage = async (url: string, width: number, height: number) => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'image/jpeg',
			'Access-Control-Allow-Origin': 'https://ww6.manganelo.tv'
		}
	});

	if (response.ok) {
		const originalImageBlob = await response.blob();

		const compressedImageBlob = await compressFileImage(originalImageBlob, width, height, 1); // 1 = 100% quality (no compression) - change as needed, e.g 0 = 0% quality (full compression)

		return URL.createObjectURL(compressedImageBlob);
	}

	throw new Error('Failed to fetch image');
};

export const compressFileImage = async (
	file: any,
	width: number,
	height: number,
	quality: number
): Promise<File> => {
	return new Promise<File>((resolve) => {
		const reader = new FileReader();

		reader.onload = async (event: any) => {
			const image = new Image();
			image.src = event.target.result as string;

			image.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;

				const ctx: any = canvas.getContext('2d');
				ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

				// Convert canvas to Blob and create a new File object
				canvas.toBlob(
					(blob: any) => {
						const compressedFile = new File([blob], file.name, {
							type: file.type,
							lastModified: Date.now()
						});
						resolve(compressedFile);
					},
					file.type,
					quality
				); // Use the provided quality parameter
			};
		};

		reader.readAsDataURL(file);
	});
};
export const compressBlobImage = async (
	file: Blob,
	width: number,
	height: number,
	quality: number
): Promise<Blob> => {
	return new Promise<Blob>((resolve) => {
		const image = new Image();

		image.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;

			const ctx: any = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

			canvas.toBlob(
				(blob: any) => {
					resolve(blob);
				},
				'image/jpeg',
				quality
			);
		};

		image.src = URL.createObjectURL(file);
	});
};
