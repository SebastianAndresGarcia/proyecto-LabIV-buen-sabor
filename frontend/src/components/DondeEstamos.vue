<template>
    <div>
        <iframe title="mapa" className="mt-3 d-block mx-auto"
        src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=es&amp;q=-32.891467922992156,-68.85962408986605&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            frameBorder="0" allowFullScreen></iframe>
        
    </div>
</template>
<script>


export default {
    data: () => ({ value: 1 }),
}
</script>
<style scoped>
iframe {
    width: 50%;
    height: 100%;
}
</style>