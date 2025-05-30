document.addEventListener('DOMContentLoaded',function(){
    const resultado = document.getElementById('resultado');
    const container = document.getElementById('container');
    const divSignos = document.querySelectorAll('.signos');
    const voltar = document.querySelectorAll('.btn-voltar')
    
    function esconderSignos() {
        divSignos.forEach(div => {
            div.style.display = 'none';
        });
    }
    
    function mostrarSigno(signo) {
        esconderSignos();
        const signoId = signo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const divSignoAtual = document.getElementById(signoId);

    if (divSignoAtual) {
        divSignoAtual.style.display = 'flex'; 
        divSignoAtual.closest('.resultado').style.display = 'block'; 
    } else {
        alert("Signo não encontrado: " + signo);
    }
    container.style.display = 'none';
}
    document.getElementById('form').addEventListener('submit',function(e){
        e.preventDefault();

        let nomeUsuario = document.getElementById('nome').value;
        let dataNascimento = document.getElementById('data-nascimento').value;
        
        const data = new Date (dataNascimento);
        const dia = data.getDate();
        const mes = data.getMonth();
        let signo = '';

        if ((mes === 11 && dia >=21) || (mes === 0 && dia <= 19)) {
            signo = 'capricornio';
        } else if ((mes === 0 && dia >=20) || (mes === 1 && dia <= 17)) {
            signo = 'aquario';
        } else if ((mes === 1 && dia >=18) || (mes === 2 && dia <= 19)) {
            signo = 'peixes';
        } else if ((mes === 2 && dia >=20) || (mes === 3 && dia <= 19)) {
            signo = 'aries';
        } else if ((mes === 3 && dia >=20) || (mes === 4 && dia <= 19)) {
            signo = 'touro';
        } else if ((mes === 4 && dia >=20) || (mes === 5 && dia <= 19)) {
            signo = 'gemeos';
        } else if ((mes === 5 && dia >=20) || (mes === 6 && dia <= 20)) {
            signo = 'cancer';
        } else if ((mes === 6 && dia >=22) || (mes === 7 && dia <= 20)) {
            signo = 'leao';
        } else if ((mes === 7 && dia >=22) || (mes === 8 && dia <= 20)) {
            signo = 'virgem';
        } else if ((mes === 8 && dia >=22) || (mes === 9 && dia <= 20)) {
            signo = 'libra';
        } else if ((mes === 9 && dia >=22) || (mes === 10 && dia <= 20)) {
            signo = 'escorpiao';
        } else if ((mes === 10 && dia >=21) || (mes === 11 && dia <= 20)) {
            signo = 'sagitario';
        }
        mostrarSigno(signo);

        const nomeDoSigno = {
            aquario: "Aquário",
            peixes: "Peixes",
            gemeos: "Gêmeos",
            escorpiao: "Escorpião",
            leao: "Leão",
            touro: "Touro",
            libra: "Libra",
            aries: "Áries",
            cancer: "Câncer",
            virgem: "Virgem",
            capricornio: "Capricórnio",
            sagitario: "Sagitário"
        }

        const signoId = signo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const divSignoAtual = document.getElementById(signoId);
        if (divSignoAtual) {
        const mensagem = divSignoAtual.querySelector('.mensagem');
        mensagem.innerText = `${nomeUsuario}, você é de ${nomeDoSigno[signo] || signo}!`;
        }
        document.querySelector('.resultado').style.display = 'block'
        
    });

    voltar.forEach(botao => {
        botao.addEventListener('click', function () {
            resultado.style.display = 'none';
            container.style.display = 'block';

            signos.forEach(div => {
                div.style.display = 'none';
            });
        });
    });
});
