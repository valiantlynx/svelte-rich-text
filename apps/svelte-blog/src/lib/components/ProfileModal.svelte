<script>
	import { logoutPocketbase } from '$lib/utils/api';
	import { page } from '$app/stores';
	import { site } from '$lib/config/site';

	const avatar = $page.data.user?.avatar
		? `${site.pocketbase}/api/files/_pb_users_auth_/${$page.data.user?.id}/${$page.data.user?.avatar}`
		: `https://avatars.dicebear.com/api/adventurer-neutral/${$page.data.user?.username}.svg`;
</script>

<!-- profile-->
{#if !$page.data.user}
	<a href="/login" class="btn btn-primary">login</a>
	<a href="/signup" class="btn btn-primary">signup</a>
{:else}
	<div class="dropdown dropdown-end">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<label tabindex="0" for="profile button" class="btn btn-primary btn-circle avatar">
			<div class="w-10 rounded-full">
				<img
					src={avatar}
					alt={`${$page.data.user.username} profile picture on ${site.title}, ${
						site.protocol + site.domain
					}`}
				/>
			</div>
		</label>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul
			tabindex="0"
			class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
		>
			<li>
				<a class="justify-between" href="/dashboard/profile/preview">
					Profile
					<span class="badge">New</span>
				</a>
			</li>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/dashboard' ? 'page' : undefined}>
				<a class="justify-between" href="/dashboard">
					Dashboard
					<span class="badge">New</span>
				</a>
			</li>
			<li>
				<button class="signout-button bg-error opacity-80" on:click={logoutPocketbase}
					>Sign Out</button
				>
			</li>
		</ul>
	</div>
{/if}
