(() => {
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.type = 'module';
    script.addEventListener('load', () => {
        let div = document.createElement('div');
        let scriptB = document.createElement('script');
        scriptB.type = 'module';
        scriptB.innerHTML = `import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
        window.supabase = createClient("https://jyqsbxypqjsjwfwpvkhn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cXNieHlwcWpzandmd3B2a2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2Njg1NzUsImV4cCI6MjA2MzI0NDU3NX0.MAY3ZEdU3V33Iq802b1PtZDqL31xPdoC6xe_ybmnrps");`
        document.querySelector('body').appendChild(scriptB);
    });
    document.querySelector('body').appendChild(script);
})();
