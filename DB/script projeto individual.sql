create database ProjIndividual;
use ProjIndividual;

create table usuario(
idUsuario int primary key auto_increment,
nomeUsuario varchar(100),
email varchar(100),
senha varchar(45)
);

INSERT INTO usuario (nomeUsuario, email, senha) VALUES 
('Marayah', 'marayah@xpto.com', 'mamipi22');
select * from usuario;


create table jogo(
idJogo int primary key auto_increment,
question1 int,
question2 int,
question3 int,
question4 int,
question5 int,
fkUsuario int,
constraint fkUsu foreign key(fkUsuario) references usuario(idUsuario)
);
select*from jogo;
drop table ogo;




