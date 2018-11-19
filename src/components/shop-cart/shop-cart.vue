<template>
    <div>

    </div>
</template>
<script>
    export default {
        name: 'shop-cart',
        props: {
            selectFoods: {
                type: Array,
                default() {
                    return []
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
            sticky: {
                type: Boolean,
                default: false
            },
            fold: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                
            }
        }
    }
</script>
<style lang="stylus" scoped>

</style>
