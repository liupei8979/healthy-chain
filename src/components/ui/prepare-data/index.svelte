<script lang="ts">
	import { TypoText } from '@src/components/typo';
</script>

<div class="prepare-data">
	<div class="field">
		<TypoText align="center" pad harmonyShade={1200} h={1}>Currently, no data here.</TypoText>
	</div>
</div>

<style lang="scss">
	.prepare-data {
		z-index: 200;
		width: 100%;
		height: 100%;
		position: absolute;
		backdrop-filter: blur(10px);
		display: flex;
		padding-top: 20vh;

		.field {
			margin: 0 auto;
			max-width: 500px;
			width: 80%;
			height: 50vh;
		}
	}
</style>
