import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { HiHeart } from 'react-icons/hi'

import {
  SignOutIcon,
  PurpleHeartIcon,
  StudyIcon,
  GiveClassesIcon,
} from '../../assets/images/icons';
import { ProffyLogo, LandingImg, Ite} from '../../assets/images';

import api from '../../services/api';

import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  TopContent,
  Header,
  LogoContainer,
  Footer,
  InfoContainer,
  ButtonsContainer,
} from './styles';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  const { signOut, user } = useAuth();
  const { push } = useHistory();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  useEffect(() => {
    api.get('connections').then(response => {
      setTotalConnections(response.data.total);
    });
  }, []);

  return (
    <Container>
      <TopContent>
        <Header>
          <Link to="/profile">
            <img
              src={
                user.avatar ||
                'https://images.vexels.com/media/users/3/140748/isolated/preview/5b078a59390bb4666df98b49f1cdedd0-avatar-de-perfil-masculino-by-vexels.png'
              }
              alt="Profile"
            />
            <span>{user.first_name}</span>
          </Link>

          <button onClick={handleSignOut} type="button">
            <SignOutIcon />
          </button>
        </Header>

        <LogoContainer>
          <div>
            {/* <ProffyLogo /> */}
            {/* <Ite /> */}
            <strong style={{ fontSize:160 }}>EAD</strong>
            <h1>Sua plataforma de estudos online.</h1>
          </div>

          <LandingImg />
        </LogoContainer>
      </TopContent>
      <Footer>
        <InfoContainer>
          <h2>
            Seja bem vindo.
            <strong>O Que deseja fazer?</strong>
          </h2>

          <small>
            Total de {totalConnections} conexões já realizadas
            <HiHeart size={20} color="green" />
            {/* <PurpleHeartIcon /> */}
          </small>
        </InfoContainer>

        <ButtonsContainer>
          <Button onClick={() => push('/study')}>
            <StudyIcon />
            Estudar
          </Button>

          <Button onClick={() => push('/give-classes')}>
            <GiveClassesIcon />
            Dar aulas
          </Button>
        </ButtonsContainer>
      </Footer>
    </Container>
  );
};

export default Landing;
