#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "Name: Manav Desai" << endl;
    cout << "Enroll No.: 2403031050061" << endl;

    int m, n;
    cin >> m >> n;

    vector<vector<int>> dp(m, vector<int>(n, 1));

    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    cout << dp[m - 1][n - 1] << endl;

    return 0;
}