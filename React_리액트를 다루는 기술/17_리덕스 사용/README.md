- 리액트 pjt에서 리덕스를 사용할 때 가장 많이 사용하는 패턴
    - 프레젠테이셔널 컴포넌트와 컨테이너 컴포넌트 분리하기
        - 프레젠테이셔널 컴포넌트
            - 주로 상태 관리가 이루어지지 않고, 그저 props를 받아 와서 화면에 UI를 보여 주기만 하는 컴포넌트
        - 컨테이너 컴포넌트
            - 리덕스와 연동되어 있는 컴포넌트
            - 리덕스로부터 상태를 받아오기도 하고 리덕스 스토어에 액션을 디스패치하기도 함
    
    프레젠테이셔널           ←(props)         컨테이너       ← (스토어 상태) ←       리덕스 
    
          컴포넌트                                        컴포넌트      → (액션 디스패치) →     스토어