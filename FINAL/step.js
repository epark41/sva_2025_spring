class StepDay {
    constructor(date, steps, index) {
      this.date = date;
      this.steps = steps;
      this.index = index;
  
      // 무작위 위치
      this.baseX = random(width);
      this.baseY = random(height);
  
      // 걸음 수에 비례한 원의 크기
      this.radius = map(this.steps, 35, 70897, 5, 100);
      this.visible = false;
  
      // 연도별 색상 설정
      let year = new Date(this.date).getFullYear();
      if (year === 2022) {
        this.color = color(255, 0, 0, 120); // 빨간색
      } else if (year === 2023) {
        this.color = color(0, 0, 255, 120); // 파란색
      } else if (year === 2024) {
        this.color = color(0, 150, 0, 120); // 초록색
      } else {
        this.color = color(100, 100, 100, 100); // 예외 처리용 회색
      }
    }
  
    display(currentIndex) {
      if (this.index <= currentIndex) {
        this.visible = true;
      }
      if (this.visible) {
        fill(this.color);
        noStroke();
        circle(this.baseX, this.baseY, this.radius);
      }
    }
  }
  
  