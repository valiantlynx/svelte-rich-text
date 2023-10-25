<script>
	import Oauth2Single from './Oauth2Single.svelte';
</script>

<div class="flex flex-col w-full">
	<!-- auth with google -->
	<div class="w-full block my-4">
		<Oauth2Single
			logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
			provider="google"
		/>
	</div>

	<!-- auth with apple -->
	<div class="w-full block my-4">
		<Oauth2Single
			logo="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png"
			provider="apple"
			active={false}
		/>
	</div>

	<!-- auth with facebook -->
	<div class="w-full block my-4">
		<Oauth2Single
			logo="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/512px-Facebook_Logo_%282019%29.png"
			provider="facebook"
			active={false}
		/>
	</div>

	<!-- auth with microsoft -->
	<div class="w-full block my-4">
		<Oauth2Single
			logo="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png"
			provider="microsoft"
			active={false}
		/>
	</div>

	<!-- auth with instagram -->
	<div class="w-full block my-4">
		<Oauth2Single
			logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/512px-Instagram-Icon.png"
			provider="instagram"
			active={false}
		/>
	</div>

	<!-- auth with X (twitter) -->
	<div class="w-full block my-4">
		<Oauth2Single
			logo="https://cdn.cms-twdigitalassets.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.2560.png"
			provider="twitter"
			active={false}
		/>
	</div>
</div>
