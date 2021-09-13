describe('Check text', () => {
  it('check text', () => {
    cy.visit('http://localhost:3000');

    // code タグ内にテキストが存在することを確認する
    cy.contains('code', 'src/App.tsx');

    // スナップショットテスト
    cy.matchImageSnapshot('test');
  });
});
