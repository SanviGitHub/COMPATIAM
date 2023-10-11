document.addEventListener('DOMContentLoaded', function() {
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const submitBtn = document.querySelector('.submit-btn');
    const compatibilityScore = document.getElementById('compatibilityScore');
    const names = document.getElementById('names');
    let typing = false;

    function typeWriter(text, targetElement, callback) {
        if (typing) return;
        typing = true;
        let index = 0;
        targetElement.value = 'Calcular Compatibilidad ';
        function write() {
            if (index < text.length) {
                targetElement.value += text.charAt(index);
                index++;
                setTimeout(write, 46);
            } else {
                typing = false;
                if (callback) {
                    callback();
                }
            }
        }
        write();
    }

    function updateSubmitValue() {
        if (typing) return;
        const name1 = name1Input.value.trim();
        const name2 = name2Input.value.trim();
        if (name1 && name2) {
            typeWriter(`${name1} y ${name2}`, submitBtn);
        } else {
            submitBtn.value = 'Calcular Compatibilidad';
        }
    }

    name1Input.addEventListener('input', updateSubmitValue);
    name2Input.addEventListener('input', updateSubmitValue);

    document.getElementById('compatibilityForm').addEventListener('submit', function(e) {
        e.preventDefault();

        let name1 = name1Input.value.trim();
        let name2 = name2Input.value.trim();

        if (name1 === "" || name2 === "") {
            alert("Por favor, ingresa ambos nombres.");
            return;
        }

        const score = calculateCompatibility(name1, name2);

        names.innerText = `${name1} y ${name2}`;
        compatibilityScore.innerText = `${score}%`;

        // Cambiando el color basado en el score
        if (score > 50) {
            compatibilityScore.style.color = 'green';
        } else {
            compatibilitysScore.style.color = 'red';
        }

        document.getElementById('result').classList.remove('hidden');
    });

    function calculateCompatibility(name1, name2) {
        const combinedNames = name1 + name2;
        let score = 0;

        for (let i = 0; i < combinedNames.length; i++) {
            score += combinedNames.charCodeAt(i);
        }

        score = score % 100;
        return score;
    }

    document.getElementById('resetBtn').addEventListener('click', function(e) {
        e.preventDefault();
        location.reload();
    });
});
