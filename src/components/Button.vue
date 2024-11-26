<script lang="ts" setup>
defineProps<{
    disabled?: boolean;
    variant?: "primary" | "outline";
}>();

</script>

<template>
    <button :class="{
        'button': true,
        '-outline': variant === 'outline',
        '-disabled': disabled === true
    }">
        <slot></slot>
    </button>
</template>

<style lang="scss">

$primaryColor: #FF5722;
$primaryDarkColor: #E64A19;
$white: #FFFFFF;
$gray100: #F5F5F5;
$gray400: #BDBDBD;


.button {
    background: $primaryColor;
    color: $white;
    padding: 16px 32px;
    border-radius: 48px;
    border: 1px solid $primaryColor;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background: $primaryDarkColor;
    }

    &.-outline {
        background: transparent;
        color: $primaryColor;

        &:hover {
            color: $primaryDarkColor;
            border-color: $primaryDarkColor;
        }

        &.-disabled {
            background: transparent;
            color: $gray400;
            border-color: $gray100;
        }
    }

    &.-disabled {
        background: $gray100;
        border-color: $gray100;
        color: $gray400;
        cursor: not-allowed;
    }

    &.-small {
        padding: 8px 16px;
    }
}
</style>