<script lang="ts">
	import { Palette } from '@src/color';
	import { Icon, IconSpinProps } from '@src/components/icon';
	import { DefIcons } from '@src/icons/defines';
	import { ComponentSizeProps } from '@src/util/component';
	import type { CSSProperties } from '@src/util/style';

	export let size: ComponentSizeProps = ComponentSizeProps.XL;
	export let styleContainer: CSSProperties | undefined = undefined;
	export let paint: Palette.Paint.Prop = { harmonyName: 'selective-yellow', harmonyShade: 1500 };
</script>

<div class="prepare-data">
	<div class="field">
		<div class="icon-container">
			<Icon
				color={Palette.Paint.from({ paint })}
				icon={DefIcons.Common.Loading}
				spin={IconSpinProps.CLOCKWISE}
				{size}
				{styleContainer}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	.prepare-data {
		z-index: 200;
		width: 100%;
		height: 70vh;
		position: absolute;
		backdrop-filter: blur(10px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.field {
		display: flex;
		justify-content: center;
		max-width: 500px;
		width: 80%;
	}

	.icon-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
